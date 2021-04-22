import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { showErrMsg, showSuccessMsg } from '../../utils/notification/Notification'


function EditUser() {
    const {id} = useParams()
    const history = useHistory()
    const [editUser, setEditUser] = useState([])

    const users = useSelector(state => state.users)
    const token = useSelector(state => state.token)

    const [checkAdmin, setCheckAdmin] = useState(false)
    const [err, setErr] = useState(false)
    const [success, setSuccess] = useState(false)
    const [num, setNum] = useState(0)

    useEffect(() => {
        if(users.length !== 0){
            users.forEach(user => {
                if(user._id === id){
                    setEditUser(user)
                    setCheckAdmin(user.role === 1 ? true : false)
                }
            })
        }else{
            history.push('/profile')
        }
    },[users, id, history])

    const handleUpdate = async () => {
        
        try {
            
                const res = await axios.patch(`/user/update`, {
                    id:editUser._id,
                    role: checkAdmin ? 1 : 0,
                    email:editUser.email,
                    profileId:editUser.profileId,
                }, {
                    headers: {Authorization: token}
                })

                setSuccess(res.data.msg)
                
            
        } catch (err) {
            err.response.data.msg && setErr(err.response.data.msg)
        }
    }

    const handleCheck = () => {
        setSuccess('')
        setErr('')
        setCheckAdmin(!checkAdmin)
    }

    return (
        <div className="profile_page edit_user">
           
<div className="row"></div>
            <div className="col-left">
                <h2>Edit User</h2>

                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" defaultValue={editUser.name} disabled/>
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" defaultValue={editUser.email} onChange={event => editUser.email=event.target.value}  />
                </div>

                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" defaultValue={editUser.profileId} onChange={event => editUser.profileId=event.target.value}  />
                </div>

                <div className="form-group">
                    <input type="checkbox" id="isAdmin" checked={checkAdmin}
                    onChange={handleCheck} />
                    <label htmlFor="isAdmin">isAdmin</label>
                </div>

                <div className="row">
                <button className="btn btn-success" onClick={handleUpdate}>Update</button>
                <button onClick={() => history.goBack()} className="go_back">
                    <i className="fas fa-long-arrow-alt-left"></i> Go Back
                </button>
                </div>
                

                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}
            </div>
        </div>
    )
}

export default EditUser

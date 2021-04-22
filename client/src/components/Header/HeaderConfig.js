import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


function HeaderConfig(props) {
    const auth = useSelector(state => state.auth)

    const {user, isLogged} = auth


   

    const handleLogout = async () => {
        try {
            await axios.get('/user/logout')
            localStorage.removeItem('firstLogin')
            window.location.href = "/";
        } catch (err) {
            window.location.href = "/";
        }
    }

    const userLink = () => {
        return <li className="drop-nav">
            <Link to="#" className="avatar">
               
            {user.accounttype !=="Email" ? <img src={`${user.profilePicture}`} alt=""/>  : <img src={`http://localhost:3000/img/profilePictures/${user.profilePicture}`} alt=""/>  } {user.name} <i className="fas fa-angle-down"></i>
            </Link>
            <ul className="dropdown">
                <li><Link to={`/profile/${user.profileId}`}> <i className="far fa-id-badge"></i> Profile</Link></li>
                <li><Link to="/" onClick={handleLogout}> <i className="fas fa-sign-out-alt"></i> Logout</Link></li>
            </ul>
        </li>
    }
    const transForm = {
        transform: isLogged ? "translateY(-5px)" : 0
    }

    return (
        <div className="header-action mt-lg-3 text-right">
            <ul style={transForm}>
                {
                    isLogged
                    ? userLink()
                    :<li><Link to="/login"><i className="fas fa-user"></i> Sign in</Link></li>
                }
            </ul>
        </div>
    );
}

export default HeaderConfig;
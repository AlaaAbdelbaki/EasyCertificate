
import { Container } from "@material-ui/core";
// import '../../assets/css/paper-dashboard.min.css';
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { useSelector } from 'react-redux';
import { useParams } from "react-router";
import {
    Col, Row
} from "reactstrap";
// import '../../assets/demo/demo.css';
import '../../assets/css/paper-dashboard.css';
import { withSnackbar } from "../Snackbar";
import socket from "../socket";
import Projects from "./Projects";
import RecentDiplomas from "./RecentDiplomas";
import UserCard from "./UserCard";
import WorkExp from "./WorkExp";




function User(props) {

   
    const users = props.users;
    const auth = useSelector(state => state.auth)
    const [profile, setProfile] = useState(null)
    const { user } = auth
    const [ready, isReady] = useState(false)


    let { profileUrl } = useParams();
    console.log({ profileUrl })
    const token = useSelector(state => state.token)
    console.log({ token })

    useEffect(() => {

        if (token) axios.get(`http://localhost:5000/user/${profileUrl}`, {
            headers: { Authorization: token }
        }).then(response => {
            console.log({ response })
            setProfile(response.data[0])
            isReady(true)
        })
            .catch(err => { });
        /*    fetch(`http://localhost:5000/user/${profileUrl}`,{ 
               headers: new Headers({
                 'Authorization': token, 
               }), 
             })
       .then(res => res.json())
       .then(res => {
           console.log(res[0])
           setProfile(res[0])
           isReady(true)
           
           
           // localStorage.setItem("user", JSON.stringify(res));
       })
       .catch(err => this.setState({ user: err })); */

    }, [profileUrl, token])

    const loaderStyle = {
        position: 'fixed',
        top: '50%',
        left: '50%'
    }
    if (!ready) {
        return (<Container style={loaderStyle}><Loader type="BallTriangle" color="#00BFFF" height={80} width={80} timeout={5000} /></Container>)
    }
    console.log(user.profileId)
    console.log(profile.profileId)
    console.log(profile.pushNotif);
    console.log(profile.emailNotif);

    if (profile.pushNotif) {
        if (user._id !== profile._id && user.name !== undefined && profile.name !== undefined) {
            const notificationData = {
                "title": "New Profile Visit !",
                "content": user.name + " visited your profile",
                "user": profile._id,
                "profilePicture": user.profilePicture
            }

            axios.post("http://localhost:5000/notifications/add", notificationData)
                .then((res) => {
                    console.log("Notification saved !");
                    for (const user of users) {
                        console.log(user.username);
                        if (user.username === profile.profileId) {
                            console.log("emit visit !!");
                            socket.emit("visit", { profile: auth.user.name, id: user.userID });
                            // socket.emit("visit", "hello");
                        }
                    }
                })
                .catch((err) => {
                    console.log("Notification not saved ! " + err);
                })
        } else {
            socket.on("recieveNotif", (a) => {
                console.log("received ssmth !!");
                console.log(JSON.stringify(a.profileName.profile));
                props.snackbarShowMessage(a.profileName.profile + " visited your profile !")
            });
            console.log("Notification not sent !!");
        }
    }

    if (user.length === 0) {
        return (
            <Fragment>
                <Container>
                    <br />
                    <div className="content">
                        <Row>
                            {/* Basic user info */}
                            <Col md="4">
                                {profile == null ? <div></div> : <UserCard profile={profile} />}
                                {/* <RecentDiplomas/> */}
                            </Col>
                            {/* Edit Profile */}
                            <Col md="8">
                                <Row>
                                    <Col sm="12">
                                        {profile == null ? <div></div> : <RecentDiplomas user={profile} />}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="6">
                                        {profile == null ? <div></div> : <WorkExp user={profile} />}
                                    </Col>
                                    <Col md="6">
                                        {profile == null ? <div></div> : <Projects user={profile} />}
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </Fragment>
        )
    } else {
        return (
            <Fragment>

                <Container>
                    <br />
                    <div className="content">
                        <Row>
                            {/* Basic user info */}
                            <Col md="4">
                                {profile == null && user == null ? <div></div> : <UserCard user={user} profile={profile} />}
                                {/* <RecentDiplomas/> */}
                            </Col>
                            {/* Edit Profile */}
                            <Col md="8">
                                <Row>
                                    <Col sm="12">
                                        {user == null ? <div></div> : <RecentDiplomas user={user} />}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="6">
                                        {user == null ? <div></div> : <WorkExp user={user} />}
                                    </Col>
                                    <Col md="6">
                                        {user == null ? <div></div> : <Projects user={user} />}
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </Fragment>

        );

    }



}



export default withSnackbar(User)

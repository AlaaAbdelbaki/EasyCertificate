
import { Container } from "@material-ui/core";
import React, { Fragment, useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { useSelector } from 'react-redux';
import {
    Col, Row
} from "reactstrap";
import Projects from "./Projects";
import RecentDiplomas from "./RecentDiplomas";
import UserCard from "./UserCard";
import WorkExp from "./WorkExp";
// import '../../assets/demo/demo.css';
import '../../assets/css/paper-dashboard.css';
// import '../../assets/css/paper-dashboard.min.css';






function User() {

    const auth = useSelector(state => state.auth)
    const [profile, setProfile] = useState(null)
    const {user} = auth
    const [ready,isReady]=useState(false)


    useEffect(() => {
        fetch(`http://localhost:5000/user/${window.location.href.replace("http://localhost:3000/profile/", "")}`)
    .then(res => res.json())
    .then(res => {
        console.log(res[0])
        setProfile(res[0])
        isReady(true)
        
        
        // localStorage.setItem("user", JSON.stringify(res));
    })
    .catch(err => this.setState({ user: err }));
   
    }, [])
    
    const loaderStyle={
        position: 'fixed',
  top: '50%',
  left: '50%'
    }
    if(!ready)
    {
        return(<Container style={loaderStyle}><Loader type="BallTriangle" color="#00BFFF" height={80} width={80} timeout={5000} /></Container>)
    }
    
    if(user.length===0)
    {
        console.log("not Connected")
        return(
        <Fragment>

        <Container>
            <br />
            <div className="content">
                <Row>
                    {/* Basic user info */}
                    <Col md="4">
                        {profile==null ? <div></div> : <UserCard profile={profile} /> }
                        {/* <RecentDiplomas/> */}
                    </Col>
                    {/* Edit Profile */}
                    <Col md="8">
                        <Row>
                            <Col sm="12">
                            {profile==null ? <div></div> : <RecentDiplomas user={profile} />}
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                {profile==null ? <div></div> : <WorkExp user={profile}/> } 
                            </Col>
                            <Col md="6">
                            {profile==null ? <div></div> :<Projects user={profile} /> }
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </Container>
    </Fragment>
    )
    }else{

            return (
                <Fragment>

                    <Container>
                        <br />
                        <div className="content">
                            <Row>
                                {/* Basic user info */}
                                <Col md="4">
                                    {profile==null && user==null ? <div></div> : <UserCard user={user} profile={profile} /> }
                                    {/* <RecentDiplomas/> */}
                                </Col>
                                {/* Edit Profile */}
                                <Col md="8">
                                    <Row>
                                        <Col sm="12">
                                           {user==null ? <div></div> : <RecentDiplomas user={user}  />}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="6">
                                        {user==null ? <div></div> :<WorkExp user={user} />}
                                        </Col>
                                        <Col md="6">
                                            {user==null ? <div></div> :<Projects user={user} />}
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

    

export default User

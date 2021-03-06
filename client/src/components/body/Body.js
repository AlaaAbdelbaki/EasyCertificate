import React, { useEffect } from "react";
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import AddCertificate from "../../components/AddCertificate";
import DeleteCertificate from "../../components/DeleteCertificate";
import UpdateCertificate from "../../components/UpdateCertificate";
import Users from "../../components/Users";
import ViewAllCertificates from "../../components/ViewAllCertificates";
import ViewCertificate from "../../components/ViewCertificate";
import Error404 from "../../pages/Error404";
import ForgotPass from '../body/auth/ForgotPassword';
import ResetPass from '../body/auth/ResetPassword';
import Home from '../Home.js';
import Notifications from "../Notifications";
import DiplomasList from "../Profile/DiplomasList";
import JobsList from "../Profile/JobsList";
import Profile from '../Profile/Profile';
import ProjectsList from "../Profile/ProjectsList";
import UpdateProfile from "../Profile/updateProfile";
import socket from "../socket";
import ActivationEmail from './auth/ActivationEmail';
import Login from './auth/Login';
import Register from './auth/Register';
import EditUser from "./profile/EditUser";





function Body() {
    const auth = useSelector(state => state.auth)
    const {isLogged,isAdmin} = auth

    var connectedUsers = [];


    socket.on("connect_error", (err) => {
      if (err.message === "invalid username") {
        console.log("invalid username")
      }
    });
  
  
    socket.on("users", (users) => {
      users.forEach((user) => {
        user.self = user.userID === socket.id;
        connectedUsers.push(user)
      });
  
  
      // put the current user first, and then sort by username
      connectedUsers = users.sort((a, b) => {
        if (a.self) return -1;
        if (b.self) return 1;
        if (a.username < b.username) return -1;
        return a.username > b.username ? 1 : 0;
      });
    });
  
    useEffect(() => {
      if (auth) {
        var username = auth.user.profileId;
        socket.auth = { username };
        socket.connect();
      }
    }, [auth])
  

    
    return (
        <section>
            <div className="App">
            <Switch>
            <Route path="/" component={Home} exact />
                
                <Route path="/login" component={isLogged ? Error404 : Login} exact/>
                <Route path="/register" component={isLogged ? Error404 : Register} exact />

                <Route path="/forgot_password" component={isLogged ? Error404 : ForgotPass} exact />
                <Route path="/user/reset/:token" component={isLogged ? Error404 : ResetPass} exact />

                <Route path="/user/activate/:activation_token" component={ActivationEmail} exact />

                <Route path="/profile/:profileUrl" exact>
            <Profile socket={socket} users={connectedUsers} />
          </Route>

          <Route path="/notifications" exact>
            {isLogged
              ? <Notifications user={auth.user}/>
              : Error404
            }
          </Route>

                
                <Route path="/profile/:profileUrl/update" exact>
                    <UpdateProfile user={auth.user} />
                  </Route>
                
                  <Route exact path="/view/:hash" component={ViewCertificate}></Route>
                  <Route exact path="/view/" component={ViewCertificate}></Route>
                  <Route path="/profile/:profileUrl/diplomas" exact component={ DiplomasList}/>
                  <Route path="/profile/:profileUrl/projects" exact>
                    <ProjectsList user={auth.user}/>
                  </Route>

                  <Route path="/profile/:profileUrl/jobs" exact>
                    <JobsList user={auth.user}/>
                  </Route>

                  {/*  Admin */}
                  <Route exact path="/viewAll">
                  {isAdmin ? <ViewAllCertificates user={auth.user._id} /> : Error404}

                  </Route>
                  
                  <Route exact path="/add">
                    {isAdmin ? <AddCertificate user={auth.user}/>  : Error404 }
                  
                  </Route> 

                  <Route exact path="/add/:userid/" component={isAdmin? AddCertificate : Error404}/> 

                  <Route exact path="/update/" component={isAdmin? UpdateCertificate : Error404}/>
                  <Route exact path="/delete/" component={isAdmin ? DeleteCertificate : Error404}></Route>
                  <Route exact path="/users" component={isAdmin ? Users : Error404}></Route>
                  <Route path="/edit_user/:id" component={isAdmin ? EditUser : Error404} exact />

                

            </Switch>
            </div>
        </section>
    )
}


export default Body

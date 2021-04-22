import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Card,
    CardBody,
    CardFooter,

    Col, Row
} from "reactstrap";


// const baseUrl = "assets/img/";

// var image = "";

export default class UserCard extends Component {

    state = {
        profile:''
    }


    componentDidMount() {
        this.setState({profile:this.props.profile})
    }

    render() {

        return (
            <div>
                <Card className="card-user">
                    <div className="image">
                        <img
                            alt="..."
                            src={"http://localhost:3000/img/damir-bosnjak.jpg"}
                        />
                    </div>
                    <CardBody>
                    <center>
                        <div className="author">
                            
                            {this.props.profile.accounttype !=="Email" ? <img
                                alt="..."
                                className="avatar border-gray profile-img"
                                src={`${this.props.profile.profilePicture}`}/> :
                                <img
                                alt="..."
                                className="avatar border-gray profile-img"
                                src={`http://localhost:3000/img/profilePictures/${this.props.profile.profilePicture}`}/>}
                          
                                
                                
                                <br/><br/>
                            <h5 className="title"><Link to={`/profile/${this.props.profile.profileId}`}>{this.props.profile.name}</Link></h5>
                           

                            <p className="description">{this.props.profile.city}, {this.props.profile.country}</p>
                        </div>
                        </center>
                        <br />
                        <p className="description text-center">
                            <b>{this.props.profile.bio}</b>
                        </p>
                          <Row>
                                <div className="update ml-auto mr-auto">
                                {(!window.location.href.includes("/update") && this.props.user!=null && this.props.profile.profileId === this.props.user.profileId) &&
                                    <Link
                                        to={`/profile/${this.props.profile.profileId}/update`}
                                        className="btn btn-primary btn-round"
                                        type="submit">
                                        Update Profile
                                    </Link>
                                }
                            </div>
                        </Row>
                    </CardBody>
                    <CardFooter>
                        <hr />
                        <div className="button-container">
                            <Row>
                                {(this.props.profile.facebook!=="undefined") && 
                                    <Col className="ml-auto" lg="4" md="12" xs="4">
                                    <h5>
                                        Facebook <br />
                                        <a
                                            className="btn btn-outline-primary btn-round btn-icon"
                                            // color="primary"
                                            href={"https://www.facebook.com/" + this.props.profile.facebook}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            size="md">
                                            <i className="fa fa-facebook" />
                                        </a>
                                    </h5>
                                </Col>}
                                {(this.props.profile.linkedin!=="undefined") && 
                                    <Col className="ml-auto" lg="4" md="12" xs="4">
                                    <h5>
                                        Linkedin<br />
                                        <a
                                            className="btn btn-outline-primary btn-round btn-icon"
                                            color="primary"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            href={"https://www.linkedin.com/in/" + this.props.profile.linkedin}
                                            size="md">
                                            <i className="fa fa-linkedin" />
                                        </a>
                                    </h5>
                                </Col>}

                                {(this.props.profile.twitter!=="undefined") && 
                                    <Col className="ml-auto" lg="4" md="12" xs="4">
                                    <h5>
                                        Twitter <br />
                                        <a
                                            className="btn btn-outline-primary btn-round btn-icon"
                                            color="primary"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            href={"https://www.twitter.com/" + this.props.profile.twitter}
                                            size="md">
                                            <i className="fa fa-twitter" />
                                        </a>
                                    </h5>
                                </Col>}
                            </Row>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        )
    }



}

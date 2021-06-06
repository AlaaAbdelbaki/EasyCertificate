import axios from "axios";
import React, { Component } from 'react';
import { FormCheck } from "react-bootstrap";
// import countrySelect from "./input.select.country";
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import {
    Button,
    Col, Form, FormGroup,
    Input,
    Row
} from "reactstrap";
// import 'react-bootstrap-country-select/dist/react-bootstrap-country-select.css';
import { withSnackbar } from "../Snackbar";


class UpdateFrom extends Component {

    constructor(props) {
        super(props);
        if (this.props.user == null) {

            this.state = {
                user: null,
                disableBtn: false,
                email: '',
                password: '',
                profilePicture: '',
                name: '',
                lastName: '',
                address: '',
                city: '',
                country: '',
                bio: '',
                profileId: '',
                facebook: '',
                twitter: '',
                linkedin: '',
            }
        } else {
            this.state = {
                // id: this.props.user._id,
                disableBtn: false,
                updatePwdDisabled: false,
                email: this.props.user.email,
                password: null,
                confirmPassword: null,
                profilePicture: this.props.user.profilePicture,
                name: this.props.user.name,
                lastName: this.props.user.lastName,
                address: this.props.user.address,
                city: this.props.user.city,
                country: this.props.user.country,
                bio: this.props.user.bio,
                profileId: this.props.user.profileId,
                facebook: this.props.user.facebook,
                twitter: this.props.user.twitter,
                linkedin: this.props.user.linkedin,
                emailNotif: this.props.user.emailNotif,
                pushNotif: this.props.user.pushNotif,
            }
        }

        this.updateProfile = this.updateProfile.bind(this);
        this.verifyProfileId = this.verifyProfileId.bind(this);
    }


    getUser() {
        // console.log("entered here :) hello boi");
        fetch(`http://localhost:5000/user/${window.location.href.replace("http://localhost:3000/profile/", "").replace("/update", "")}`)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    user: res[0],
                    email: res[0]['email'],
                    password: null,
                    profilePicture: res[0]['profilePicture'],
                    name: res[0]['name'],
                    lastName: res[0]['lastName'],
                    address: res[0]['address'],
                    city: res[0]['city'],
                    country: res[0]['country'],
                    bio: res[0]['bio'],
                    profileId: res[0]['profileId'],
                    facebook: res[0]['facebook'],
                    twitter: res[0]['twitter'],
                    linkedin: res[0]['linkedin'],
                    emailNotif: res[0]['emailNotif'],
                    pushNotif: res[0]['pushNotif'],
                });
                // localStorage.setItem("user", JSON.stringify(res));
            })
            .catch(err => this.setState({ user: err }));
    }


    componentWillMount() {
        if (this.props.user == null) { console.log('getting user'); this.getUser() };
    }

    selectCountry(val) {
        this.setState({ country: val });
    }

    selectRegion(val) {
        this.setState({ city: val });
    }

    updateProfile() {


        const formData = new FormData();

        formData.append("profilePicture", this.state.profilePicture);
        formData.append("email", this.state.email);
        formData.append("name", this.state.name);
        formData.append("city", this.state.city);
        formData.append("country", this.state.country);
        formData.append("bio", this.state.bio);
        formData.append("profileId", this.state.profileId);
        formData.append("facebook", this.state.facebook);
        formData.append("twitter", this.state.twitter);
        formData.append("linkedin", this.state.linkedin);
        formData.append("emailNotif", this.state.emailNotif);
        formData.append("pushNotif", this.state.pushNotif);

        if (this.state.disableBtn === false) {
            axios({
                method: "post",
                url: `http://localhost:5000/user/update/${this.props.user._id}`,
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then(res => {
                    // console.log("request itmes: "+JSON.stringify(formData))
                    if (res.status === 200) {
                        this.props.snackbarShowMessage(`Updated Successfully !`);
                    }
                }).catch(err => {
                    console.log(err);
                    this.props.snackbarShowMessage(`Error ! Please Try again later`, "error");
                });
        } else {
            this.props.snackbarShowMessage(`Error ! Profile ID already exists !`, "error");
        }

        // setInterval(() => {
        //     window.location.reload();
        // }, 200);
        setInterval(200);
        window.location.replace(`http://localhost:3000/profile/${this.state.profileId}`);

    }

    verifyProfileId(profileId) {
<<<<<<< HEAD
        // eslint-disable-next-line 
        var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/;
=======

        var format = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,<>\/?~]/;
>>>>>>> c04dc49f26aa66c1c606f13b1d560ba86525915c

        if (format.test(profileId)) {
            this.props.snackbarShowMessage(`Profile Id should not contain special characters or spaces !`, `error`);
            this.setState({
                disableBtn: true,
            })
            return false;
        } else {
            axios.get(`http://localhost:5000/user/` + profileId.toLowerCase())
                .then(res => {
                    // console.log("field value is: "+event.target.value);
                    // console.log("result is : "+res.data.length);
                    if (res.data.length > 0) {
                        this.setState({
                            disableBtn: true,
                        });
                        this.props.snackbarShowMessage(`Profile Id already in use, Please try another one`, `error`)
                    } else {
                        this.setState({
                            disableBtn: false,
                        });
                    }
                })
                .catch(err => {
                    console.log("error oh no !! " + err);
                });
            return true;
        }
    }

    render() {
        // console.log(this.state)
        return (
            <div>
                {/* Add form here if u wanted to add idk */}
                <Form>
                    <Row>
                        <Col md="12">
                            <FormGroup>
                                <label htmlFor="email">
                                    Email address
                                </label>
                                <Input
                                    name="email"
                                    placeholder="Email"
                                    type="email"
                                    defaultValue={this.state.email}
                                    onChange={event => {
                                        this.setState({
                                            email: event.target.value,
                                        });
                                        // console.log("changed");
                                    }} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="pr-1" md="12">
                            <FormGroup>
                                <label>Name</label>
                                <Input
                                    defaultValue={this.state.name}
                                    placeholder="Company"
                                    type="text"
                                    onChange={event => {
                                        this.setState({
                                            name: event.target.value,
                                        });
                                        // console.log("changed");
                                    }}
                                />
                            </FormGroup>
                        </Col>

                    </Row>
                    <Row>
                        <Col md="12">
                            <FormGroup>
                                <label>Profile Picture</label>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={event => {
                                        const file = event.target.files[0];
                                        console.log(file)
                                        this.setState({
                                            profilePicture: file,
                                        })
                                    }}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="pr-1" md="6">
                            <FormGroup>
                                <label>Country</label>
                                <CountryDropdown
                                    className="form-control"

                                    value={this.state.country}
                                    onChange={(val) => this.selectCountry(val)} />

                            </FormGroup>
                        </Col>
                        <Col className="pl-1" md="6">
                            <FormGroup>
                                <label>City</label>
                                <RegionDropdown
                                    className="form-control"
                                    country={this.state.country}
                                    value={this.state.city}
                                    onChange={(val) => this.selectRegion(val)} />

                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12">
                            <FormGroup>
                                <label>About Me</label>
                                <Input
                                    type="textarea"
                                    defaultValue={this.state.bio}
                                    onChange={event => {
                                        this.setState({
                                            bio: event.target.value,
                                        });
                                    }}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12">
                            <FormGroup>
                                <label>Profile Link</label>
                                <Input
                                    type="text"
                                    defaultValue={this.state.profileId}
                                    onChange={event => {
                                        this.setState({
                                            profileId: event.target.value.toLowerCase(),
                                        });
                                    }}
                                    placeholder="Profile URL"
                                    onBlur={event => {
                                        //Check profile link validity here
                                        const currentLink = window.location.href.replace("http://localhost:3000/profile/", "").replace("/update", "");
                                        // console.log(currentLink);
                                        if (event.target.value !== currentLink) {
                                            this.verifyProfileId(event.target.value);
                                        } else {
                                            this.setState({
                                                disableBtn: false,
                                            });
                                        }
                                    }}
                                />

                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="12" lg="3">
                            <h5><i className="fa fa-facebook" /> Facebook</h5>
                        </Col>
                        <Col sm="4" lg="3">
                            <FormGroup>
                                <Input disabled defaultValue="facebook.com/" />
                            </FormGroup>
                        </Col>
                        <Col sm="8" lg="6">
                            <FormGroup>
                                <Input placeholder="Profile Link" defaultValue={this.state.facebook} onChange={event => {
                                    this.setState({
                                        facebook: event.target.value,
                                    });
                                }} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="12" lg="3">
                            <h5><i className="fa fa-twitter" /> Twitter</h5>
                        </Col>
                        <Col sm="4" lg="3">
                            <FormGroup>
                                <Input disabled defaultValue="twitter.com/" />
                            </FormGroup>
                        </Col>
                        <Col sm="8" lg="6">
                            <FormGroup>
                                <Input placeholder="Profile Link" defaultValue={this.state.twitter} onChange={event => {
                                    this.setState({
                                        twitter: event.target.value,
                                    });
                                }} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="12" lg="3">
                            <h5><i className="fa fa-linkedin" /> Linkedin</h5>
                        </Col>
                        <Col sm="4" lg="3">
                            <FormGroup>
                                <Input disabled value="linkedin.com/in/" />
                            </FormGroup>
                        </Col>
                        <Col sm="8" lg="6">
                            <FormGroup>
                                <Input placeholder="Profile Link" defaultValue={this.state.linkedin} onChange={event => {
                                    this.setState({
                                        linkedin: event.target.value,
                                    });
                                }} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="12">
                            <h5>Notificaions</h5>
                            <span htmlFor="notifs">
                                <input type="checkbox" id="notif" style={{ marginRight: '10px' }} defaultChecked={this.state.pushNotif} onChange={(val) => {
                                    this.setState({
                                        pushNotif: val.target.checked,
                                    });
                                }} />
                                Receive push notifications
                            </span><br />
                            <span htmlFor="notifs">
                                <input type="checkbox" id="notif" style={{ marginRight: '10px' }} defaultChecked={this.state.emailNotif} onChange={(val) => {
                                    this.setState({
                                        emailNotif: val.target.checked,
                                    });
                                }} />
                                Receive Email notifications
                            </span>
                        </Col>
                    </Row>
                    <Row>
                        <div className="update ml-auto mr-auto">
                            <Button
                                className="btn-round"
                                disabled={this.state.disableBtn}
                                color="success"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (this.verifyProfileId(this.state.profileId)) {
                                        this.updateProfile();
                                    }
                                    // if (this.state.profileId === "" || this.state.profileId === undefined) {
                                    //     this.props.snackbarShowMessage(`Profile URL cannot be empty !`, `error`)
                                    // } else {
                                    //     if (this.state.profileId.includes(" ")) {
                                    //         this.props.snackbarShowMessage(`Profile URL cannot contain spaces !`, "error");
                                    //     } else {
                                    //         this.updateProfile();
                                    //     }
                                    // }
                                }}>
                                Update Profile
                            </Button>
                        </div>
                    </Row>
                </Form>
                <Form>
                    <Row>
                        <Col><h5>Change Password</h5></Col>
                    </Row>
                    <Row>
                        <Col md='12'>
                            <label>Password</label>
                            <Input
                                type="password"
                                placeholder="Password"
                                onChange={event => {
                                    // console.log(event.target.value);
                                    this.setState({
                                        password: event.target.value,
                                    })
                                }}
                            />

                        </Col>
                    </Row>
                    <Row>
                        <Col md='12'>
                            <label>Confirm Password</label>
                            <Input
                                type="password"
                                placeholder="Retype Password"
                                onChange={event => {
                                    // console.log(event.target.value);
                                    this.setState({
                                        confirmPassword: event.target.value,
                                    })
                                }}
                                onBlur={event => {
                                    if (event.target.value !== this.state.password) {
                                        this.props.snackbarShowMessage(`Passwords not matching please verify`, "error");
                                        this.setState({
                                            updatePwdDisabled: true,
                                        });
                                    } else {
                                        this.props.snackbarShowMessage(`Passwords match !`, "success");
                                        this.setState({
                                            updatePwdDisabled: false,
                                        })
                                    }
                                }}
                            />

                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <div className="update ml-auto mr-auto">
                            <Button
                                className="btn-round"
                                disabled={this.state.updatePwdDisabled}
                                color="success"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if ((this.state.password === null || this.state.confirmPassword === null) || (this.state.password === "" || this.state.confirmPassword === "")) {
                                        console.log("Password: " + this.state.password);
                                        console.log("confirm password: " + this.state.confirmPassword);
                                        this.props.snackbarShowMessage(`Password fields are empty please verify !`, "error");
                                        this.setState({
                                            updatePwdDisabled: true,
                                        });
                                    } else {
                                        if (this.state.password === this.state.confirmPassword) {
                                            const data = {
                                                "id": this.props.user._id,
                                                "password": this.state.password
                                            }
                                            axios.post("http://localhost:5000/user/updatepwd", data)
                                                .then(res => {
                                                    if (res.status === 200) {
                                                        this.props.snackbarShowMessage(`Password updated successfully`, "success");
                                                    } else {
                                                        this.props.snackbarShowMessage(`Error try again later !`, "error");
                                                    }
                                                })
                                                .catch(err => {
                                                    console.log("axios error !: " + err);
                                                })
                                        }
                                    }

                                }}>
                                Update Password
                            </Button>
                        </div>
                    </Row>
                </Form>
                {/* end form here */}
            </div>
        )
    }
}

export default withSnackbar(UpdateFrom)

import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import {
    Button,
    Col, Form, FormGroup,
    Input,
    Row
} from "reactstrap";
import { withSnackbar } from '../../components/Snackbar';







export class UpdateJobs extends Component {

    jobs = []
    constructor(props) {
        super(props);
        this.state = {
            // id: this.props.user._id,
            jobId: "",
            title: "",
            company: "",
            started: new Date(),
            left: new Date(),
            update: false,
            userId: this.props.user._id,

        }
        this.AddJob = this.AddJob.bind(this);
        this.UpdateJob = this.UpdateJob.bind(this);
        this.DeleteJob = this.DeleteJob.bind(this);
        this.resetFields = this.resetFields.bind(this);
    }

    getUser() {
        // console.log("entered here :) hello boi");
        fetch(`http://localhost:5000/user/${window.location.href.replace("http://localhost:3000/profile/", "").replace("/update", "")}`)
            .then(res => res.json())
            .then(res => {
                this.setState({ user: res[0]['_id'] });
                // localStorage.setItem("user", JSON.stringify(res));
            })
            .catch(err => this.setState({ user: err }));
    }


    componentDidMount() {
        if (this.props.user === undefined) {
            this.getUser()
        } else {
            console.log("getting jobs beep boop "); this.getJobs(this.props.user._id);
        };
    }


    getJobs(id) {
        // this.jobs = [];
        // console.log("entered here :) hello boi");
        // console.log("http://192.168.1.17:5000/jobs/" + id)
        // console.log("http://localhost:5000/jobs/" + id)
        fetch("http://localhost:5000/jobs/" + id)
            .then(res => res.json())
            .then(res => {
                // console.log(res);
                this.setState({
                    full: true,
                })
                this.jobs = res;
                // do not delete for some unknown reason this is what makes the code work :) :) :) 
                // console.log("henlo :) ")
                console.log("length is " + this.jobs.length());
                // do not delete for some unknown reason this is what makes the code work :) :) :) 
            })
            .catch(err => this.setState({ user: err }));
    }

    resetFields() {
        this.setState({
            jobId: "",
            title: "",
            company: "",
            started: new Date(),
            left: new Date(),
            update: false,
        })
    }

    AddJob() {
        // console.log("entered here !!");
        // console.log(this.props.user._id);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: this.state.title,
                company: this.state.company,
                started: this.state.started,
                left: this.state.left,
                userId: this.state.userId,
            })
        };
        // console.log(requestOptions);
        if (this.state.started > this.state.left) {
            this.props.snackbarShowMessage(`Start date can't be greater than leaving date !`, "error");
        } else {

            fetch(`http://localhost:5000/jobs/add/`, requestOptions)
                .then(response => {
                    // console.log(response);
                    console.log(requestOptions.body);
                    if (response.status === 200) {
                        this.resetFields();
                        this.getJobs(this.state.userId);
                        this.props.snackbarShowMessage(`Added Successfully !`);
                    } else {
                        this.props.snackbarShowMessage(`Error ! Please Try again later`, "error");
                    }
                });
        }
        console.log("snackbar should be out !! ");
        // return (
        //     // <Snackbar
        //     //     // severity="success"
        //     //     // message="Updated successfully !"
        //     // />
        // )
    }

    DeleteJob(jobId) {
        const requestOptions = {
            method: 'DELETE',
        };
        fetch(`http://localhost:5000/jobs/delete/` + jobId, requestOptions)
            .then(response => {
                if (response.status === 200) {
                    this.getJobs(this.state.userId);
                    this.props.snackbarShowMessage(`Job deleted successfully !`);
                } else {
                    this.props.snackbarShowMessage(`Error ! Please Try again later`, "error");
                }
            });
    }

    UpdateJob(jobId) {
        // console.log(jobId);
        // console.log("entered here !!");
        // console.log(this.props.user._id);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: this.state.title,
                company: this.state.company,
                started: this.state.started,
                left: this.state.left,
            })
        };
        if (this.state.started > this.state.left) {
            this.props.snackbarShowMessage(`Start date can't be greater than leaving date !`, "error");
        } else {
            fetch(`http://localhost:5000/jobs/update/` + jobId, requestOptions)
                .then(response => {
                    // console.log(requestOptions);
                    // console.log(response);
                    // console.log(requestOptions.body);
                    if (response.status === 200) {
                        this.props.snackbarShowMessage(`Updated Successfully !`, 'success');
                        this.resetFields();
                        this.getJobs(this.state.userId);
                    } else {
                        this.props.snackbarShowMessage(`Error ! Please Try again later`, "error");
                    }
                });
        }
    }

    render() {
        let button;
        if (this.state.update === true) {
            button = <div>
                <Button
                    className="btn-round"
                    color="primary"
                    onClick={(e) => {
                        e.preventDefault();
                        if (this.state.title === "" || this.state.company === "" || this.state.started === "" || this.state.left === "") {
                            this.props.snackbarShowMessage(`Some fields are empty please verify !`, "error");
                        } else {
                            this.UpdateJob(this.state.jobId);
                        }
                    }}>
                    Update Job
                </Button>
                <Button
                    className="btn-round"
                    color="danger"
                    onClick={(e) => {
                        e.preventDefault();
                        this.resetFields();
                    }}>
                    Cancel
                </Button>
            </div>
        } else {
            button = <Button
                className="btn-round"
                color="success"
                onClick={(e) => {
                    e.preventDefault();
                    if (this.state.title === "" || this.state.company === "" || this.state.started === "" || this.state.left === "") {
                        this.props.snackbarShowMessage(`Some fields are empty please verify !`, "error");
                    } else {
                        this.AddJob();
                    }
                }}>
                Add Job
                            </Button>
        }
        if (this.props.user !== undefined) {
            console.log("here user ? " + this.props.user._id);
            return (
                <div>
                    <div>
                        <Form>
                            <Row>
                                <Col md="12">
                                    <FormGroup>
                                        <label>
                                            Job Title
                                    </label>
                                        <Input
                                            placeholder="Job title"
                                            type="text"
                                            value={this.state.title}
                                            onChange={event => {
                                                this.setState({
                                                    title: event.target.value,
                                                });
                                                // console.log("changed");
                                            }} />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="12">
                                    <FormGroup>
                                        <label>
                                            Company
                                    </label>
                                        <Input
                                            placeholder="Company"
                                            type="text"
                                            value={this.state.company}
                                            onChange={event => {
                                                this.setState({
                                                    company: event.target.value,
                                                });
                                                // console.log("changed");
                                            }} />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="12">
                                    <FormGroup>
                                        <Row>
                                            <Col md="6" sm="12">
                                                <label>
                                                    Started
                                        </label>
                                                {/* <Input
                                                    placeholder="Started"
                                                    type="text"
                                                    value={this.state.started}
    
                                                    onChange={event => {
                                                        this.setState({
                                                            started: event.target.value,
                                                        });
                                                        // console.log("changed");
                                                    }} /> */}
                                                <DatePicker
                                                    className="form-control"
                                                    selected={this.state.started}
                                                    dateFormat="dd/MM/yyyy"
                                                    showMonthYearDropdown={true}
                                                    onChange={date => {
                                                        // console.log(date);
                                                        // event.selected = event;
                                                        this.setState({
                                                            started: date,
                                                        });
                                                    }}
                                                />
                                            </Col>
                                            <Col md="6" sm="12">
                                                <label>
                                                    Left
                                        </label>
                                                {/* <Input
                                                    placeholder="Left"
                                                    type="text"
                                                    value={this.state.left}
    
                                                    onChange={event => {
                                                        this.setState({
                                                            left: event.target.value,
                                                        });
                                                        // console.log("changed");
                                                    }} /> */}
                                                <DatePicker
                                                    className="form-control"
                                                    dateFormat="dd/MM/yyyy"
                                                    selected={this.state.left}
                                                    onChange={date => {
                                                        // console.log(date.getFullYear());
                                                        console.log(this.state.left);
                                                        // event.selected = event;
                                                        this.setState({
                                                            left: date,
                                                        });
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <div className="update ml-auto mr-auto">
                                    {button}
                                </div>
                            </Row>
                        </Form>
                    </div>
                    {/* <BootstrapTable keyField='id' data={jobs} columns={columns} cellEdit={ cellEditFactory({ mode: 'click' }) }/> */}
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Job Title</th>
                                <th>Company</th>
                                <th>Started</th>
                                <th>Left</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        {this.jobs.length>0 && <tbody>
                            {console.log("hello jobs: "+this.jobs)}
                            {this.jobs.map((job) => (
                                <tr key={job._id}>
                                    <td>{job.title}</td>
                                    <td>{job.company}</td>
                                    <td>{"" + new Date(job.started).getDate() + "/" + (new Date(job.started).getMonth() + 1) + "/" + new Date(job.started).getFullYear()}</td>
                                    <td>{"" + new Date(job.left).getDate() + "/" + (new Date(job.left).getMonth() + 1) + "/" + new Date(job.left).getFullYear()}</td>
                                    <td><Button className="btn-round" color="primary" onClick={(e) => {
                                        e.preventDefault();
                                        this.setState({
                                            jobId: job._id,
                                            title: job.title,
                                            company: job.company,
                                            started: new Date(job.started),
                                            left: new Date(job.left),
                                            update: true,
                                        });
                                    }}>Edit</Button></td>
                                    <td><Button className="btn-round" color="danger" onClick={(e) => {
                                        e.preventDefault();
                                        this.DeleteJob(job._id);
                                    }}>Delete</Button></td>
                                </tr>
                            ))}
                        </tbody>}
                    </Table>
                </div>
            )
        } else {
            return (<div></div>)
        }
    }
}

export default withSnackbar(UpdateJobs)

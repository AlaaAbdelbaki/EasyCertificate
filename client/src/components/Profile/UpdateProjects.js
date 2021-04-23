import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import {
    Button,




    Col, Form, FormGroup,

    Input,
    Row
} from "reactstrap";
import { withSnackbar } from '../../components/Snackbar';



var projects = [];



export class UpdateProjects extends Component {


    constructor(props) {
        super(props);
        this.state = {
            // id: this.props.user._id,
            projectId: "",
            title: "",
            link: "",
            userId: this.props.user._id,
            update: false,
        }
        this.addProject = this.addProject.bind(this);
        this.updateProject = this.updateProject.bind(this);
        this.deleteProject = this.deleteProject.bind(this);
        this.resetFields = this.resetFields.bind(this);
    }

    addProject() {
        // console.log("entered here !!");
        // console.log(this.props.user._id);
        if (this.state.title === "" || this.state.title === "" || this.state.link === "") {
            this.props.snackbarShowMessage(`Some fields are empty !`, "error");
        } else {

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: this.state.title,
                    link: this.state.link,
                    userId: this.state.userId,
                })
            };
            fetch(`http://localhost:5000/projects/add/`, requestOptions)
                .then(response => {
                    // console.log(response);
                    console.log(requestOptions.body);
                    if (response.status === 200) {
                        this.resetFields();
                        this.getProjects(this.state.userId);
                        this.props.snackbarShowMessage(`Added Successfully !`);
                    } else {
                        this.props.snackbarShowMessage(`Error ! Please Try again later`, "error");
                    }
                });
            console.log("snackbar should be out !! ");
        }
    }

    resetFields() {
        this.setState({
            projectId: "",
            title: "",
            link: "",
            userId: this.props.user._id,
            update: false,
        })
    }

    updateProject(projectId) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: this.state.title,
                link: this.state.link,
            })
        };
        fetch(`http://localhost:5000/projects/update/` + projectId, requestOptions)
            .then(response => {
                // console.log(response);
                console.log(requestOptions.body);
                if (response.status === 200) {
                    this.resetFields();
                    this.getProjects(this.state.userId);
                    this.props.snackbarShowMessage(`Updated Successfully !`);
                } else {
                    this.props.snackbarShowMessage(`Error ! Please Try again later`, "error");
                }
            });
        console.log("snackbar should be out !! ");
    }

    deleteProject(projectId) {
        const requestOptions = {
            method: 'DELETE',
        };
        fetch(`http://localhost:5000/projects/delete/` + projectId, requestOptions)
            .then(response => {
                // console.log(response);
                console.log(requestOptions.body);
                if (response.status === 200) {
                    this.getProjects(this.state.userId);
                    this.props.snackbarShowMessage(`Deleted Successfully !`);
                } else {
                    this.props.snackbarShowMessage(`Error ! Please Try again later`, "error");
                }
            });
        console.log("snackbar should be out !! ");
    }

    getProjects(id) {
        projects = [];
        // console.log("entered here :) hello boi");
        // console.log("http://192.168.1.17:5000/jobs/" + id)
        fetch("http://localhost:5000/projects/" + id)
            .then(res => res.json())
            .then(res => {
                // console.log(res);
                this.setState({
                    full: true,
                })
                projects = res;
                // do not delete for some unknown reason this is what makes the code work :) :) :) 
                console.log("length is " + projects.length());
                // do not delete for some unknown reason this is what makes the code work :) :) :) 
            })
            .catch(err => this.setState({ user: err }));
    }


    componentDidMount() {
        // console.log(this.props.user);
        this.getProjects(this.props.user._id);
        // console.log(this.state.jobs);

    }


    render() {
        let button;
        if (this.state.update === false) {
            button = <Button
                className="btn-round"
                color="success"
                onClick={(e) => {
                    e.preventDefault();
                    this.addProject();
                }}>
                Add Project
    </Button>
        } else {
            button = <div>
                <Button
                    className="btn-round"
                    color="primary"
                    onClick={(e) => {
                        e.preventDefault();
                        this.updateProject(this.state.projectId);
                    }}>
                    Update Project
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
        }
        return (
            <div>
                <div>
                    <Form>
                        <Row>
                            <Col md="12">
                                <FormGroup>
                                    <label htmlFor="email">
                                        Project Title
                                </label>
                                    <Input
                                        placeholder="Project title"
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
                                    <label htmlFor="email">
                                        Project Link
                                </label>
                                    <Input
                                        placeholder="Project Link"
                                        type="text"
                                        value={this.state.link}
                                        onChange={event => {
                                            this.setState({
                                                link: event.target.value,
                                            });
                                            // console.log("changed");
                                        }} />
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
                {/* <BootstrapTable keyField='id' data={projects} columns={columns} /> */}
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Project Title</th>
                            <th>Link</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project) => (
                            <tr key={project._id}>
                                <td>{project.title}</td>
                                <td><a href={project.link} target="_blank" rel="noreferrer">{project.link}</a></td>
                                <td><Button className="btn-round" color="primary" onClick={(e) => {
                                    e.preventDefault();
                                    this.setState({
                                        projectId: project._id,
                                        title: project.title,
                                        link: project.link,
                                        update: true,
                                    });
                                }}>Edit</Button></td>
                                <td><Button className="btn-round" color="danger" onClick={(e) => {
                                    e.preventDefault();
                                    this.deleteProject(project._id);
                                }}>Delete</Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default withSnackbar(UpdateProjects)

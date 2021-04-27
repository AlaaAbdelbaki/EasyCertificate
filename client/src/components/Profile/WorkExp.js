import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Card,

    CardBody, CardHeader,

    CardTitle,

    Col, Row
} from "reactstrap";


var jobs = []



export default class WorkExp extends Component {

    constructor(props) {
        super(props);
        // console.log(this.props.user._id);
        this.state = {
            jobs: null,
            full: false
        }
    }
    getJobs(id) {
        // console.log("entered here :) hello boi");
        // console.log("http://192.168.1.17:5000/jobs/" + id)
        fetch("http://localhost:5000/jobs/" + id)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                this.setState({
                    full: true,
                })
                jobs = res;
                // do not delete for some unknown reason this is what makes the code work :) :) :) 
                console.log("length is " + jobs.length());
                // do not delete for some unknown reason this is what makes the code work :) :) :) 
            })
            .catch(err => this.setState({ user: err }));
    }

    componentDidMount() {

        this.getJobs(this.props.user._id);
        // console.log(this.state.jobs);

    }

    render() {
        console.log(this.props.user);
        if (this.props.user == null)
            <div>

            </div>
        else {
            return (
                <div>
                    <Card className="card-user">
                        <CardHeader>
                            <CardTitle tag="h5">Work Experience</CardTitle>
                        </CardHeader>
                        <CardBody>
                            {/* Add form here if u wanted to add idk */}
                            <Row>
                                <Col sm="12">
                                    {jobs.map((job) => (
                                        <ul className="list-unstyled team-members" key={job._id}>
                                            <li>
                                                {job.title} - {job.company}<br />
                                                <span className="text-muted">
                                                    <small>{new Date(job.started).getFullYear()}-{new Date(job.left).getFullYear()}</small>
                                                </span>
                                                <br />
                                            </li>
                                        </ul>
                                    ))}
                                </Col>
                            </Row>
                            <Row>
                                <div className="update ml-auto mr-auto">
                                    <Link
                                        className="btn btn-round btn-primary"
                                        to={`/profile/${window.location.href.replace("http://localhost:3000/profile/", "")}/jobs`}>
                                        View All
                                </Link>
                                </div>
                            </Row>
                            <br />
                            {/* end form here */}
                        </CardBody>
                    </Card>
                </div>
            )
        }
    }
}

import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import {
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Col, Row
} from "reactstrap";
import { Container } from '@material-ui/core';
import axios from 'axios';


const Notifications = (props) => {
    const user=props.user;
    const auth = useSelector(state => state.auth);
    const [ready, isReady] = useState(false)
    const [notifications, setNotifications] = useState({
        notifs: null,
    })

    useEffect(() => {
        if (props.user._id != null) {
            console.log("http://localhost:5000/notifications/user/" + user._id);
            axios.get(`http://localhost:5000/notifications/user/${user._id}`)
                .then((res) => {
                    const result = res.data;
                    setNotifications({ notifs: result })
                    console.log(res.data[0]);
                    isReady(true);
                })
                .catch((err) => {
                    console.log("Notification fetching error !\n" + err);
                });
        }
    }, [user])


    if (!ready) {
        return (<div></div>)
    } else {
        // console.log(this.state.notifications.length);
        return (
            <div>
                <Container>
                    <br />
                    <Card className="card-user">
                        <CardHeader>
                            <CardTitle tag="h1">Notifications</CardTitle>
                        </CardHeader>
                        <CardBody>
                            {/* Add form here if u wanted to add idk */}
                            {notifications.notifs.map((notif) => (
                                <Row>
                                    <Col sm="1">
                                        <img src={`http://localhost:3000/img/profilePictures/${notif.profilePicture}`} height="50px" />
                                    </Col>
                                    <Col sm="11">
                                        <Row>
                                            <Col sm="12">
                                                <h4>{notif.title}</h4>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col sm="12">
                                                {notif.content}
                                            </Col>
                                        </Row>
                                        <br />
                                    </Col>
                                </Row>

                            ))}
                            <br />
                            {/* end form here */}
                        </CardBody>
                    </Card>
                </Container>
            </div>
        )
    }
}

export default Notifications

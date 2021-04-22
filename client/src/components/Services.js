import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import background from "../assets/img/Blockchain-technology.jpg";

class Services extends Component {

    bgstyle =  {
        backgroundImage:` url(${background})`,
        backgroundRepeat:"no-repeat",
        backgroundSize: 'cover', 
        backgroundPosition: 'center center',
    }

textstyle={
    'color':'#ffffff'
}

    render() {
        return (

            <div  >
                <Container >
                    <center>
                        <Row>
                           
                            
                            <Col>
                                <br /><br /><br />
                                <Row>
                                    <Col>
                                    <h2>Services</h2>
                                    </Col>
                                </Row>
                                <br/> <br/>
                                <Row>
                                   
                                    <Col sm="12" md="4">
                                    <i style={{fontSize:'150px'}} className="fab fa-ethereum"></i><br/><br/>
                                    <h4>Safely Store Certificates Data On The Ethereum Blockchain.</h4>
                                    
                                    </Col>
                                    <Col sm="12" md="4">
                                    <i style={{fontSize:'150px'}} className="fas fa-user"></i><br/><br/>
                                    <h4>Showcase Your Work Certificates,Experiences And Projects On Your Highly Customizable Profile.</h4>
                                    
                                    </Col>
                                    <Col sm="12" md="4">
                                    <i style={{fontSize:'150px'}} className="fas fa-graduation-cap"></i><br/><br/>
                                    <h4>Easy Access To Your Verified Certificates Anytime.</h4>
                               
                                    </Col>
                                    
                                </Row>
                            </Col>
                         
                        </Row>
                    </center>
                </Container>
                <br/><br/><br/><br/>
            </div>

        )
    }
}

export default Services

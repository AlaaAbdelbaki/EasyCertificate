import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import background from "../assets/img/Blockchain-technology.jpg";
class About extends Component {
    
    constructor(props) {
        super(props)
        this.myRef = React.createRef()  
    }


   
        bgstyle =  {
            backgroundImage:` url(${background})`,
            backgroundRepeat:"no-repeat",
            backgroundSize: 'cover', 
            backgroundPosition: 'center center',
        }

    render() {
        return (
            
            <div ref={this.myRef} >
                <Container >
                <center>
                    <Row><br></br></Row><Row><br></br></Row><Row><br></br></Row>
                <Row>
                     <Col sm="6">
                         <img src="img/aboutus.png" alt="" style={{ backgroundPosition: 'center center', backgroundSize: 'contain', }}></img>
                    </Col>
                    <Col sm="6">
                    <br/><br/><br/><br/>
                       
                    <Row>
                        <Col>
                        
                        <h3 >We are a Team that believes in the power of Blockchain and how it can simplifiy our lives</h3>
                        </Col>
                    </Row>
                    </Col>
                </Row>
                </center>
                <Row><br/><br/><br/></Row>
                <Row>
                
                    <Col sm="6">
                    <br/><br/><br/><br/>
                       
                    <Row style={{alignContent:'start',alignItems:'start'}}>
                        <Col >
                        <Row >
                            <Col > <i  style={{verticalAlign: 'middle',color:'#657786'}} className="fas fa-5x fa-envelope"></i><a href="mailto:easycertificate1@gmail.com" className="stretched-link" style={{fontSize:'20px',paddingLeft:'20px'}}>easycertificate1@gmail.com</a></Col>
                        </Row>

                        <Row>
                            <Col><i  style={{verticalAlign: 'middle',color:'#006aff'}} className="fab fa-5x fa-facebook-square"></i><span style={{fontSize:'20px',paddingLeft:'25px'}}>EasyCertificate</span></Col>
                        
                        </Row>
                        
                        <Row>
                            <Col> <i style={{verticalAlign: 'middle',color:'#1da1f2'}} className="fab fa-5x fa-twitter-square"></i><span style={{fontSize:'20px',paddingLeft:'25px'}}>@EasyCertificate</span></Col>
                       
                        </Row>
                        
                        </Col>
                    </Row>
                    </Col>     
                    <Col sm="6">
                         <img src="img/contactus.jpg" alt="" style={{ backgroundPosition: 'center center', backgroundSize: 'contain', }}></img>
                    </Col>       
                </Row>
                <Row><br></br></Row><Row><br></br></Row><Row><br></br></Row>
           
                </Container>
            </div>
           
        )
    }
}

export default About

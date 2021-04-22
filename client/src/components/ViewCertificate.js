import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { Col, Container, Form, Row } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import background from "../assets/img/diplome_template.png";
import { epochToDate, loadBlockchainData } from '../utils/helper';





class ViewCertificate extends Component {
    
    
    state={
        hash:'',
        nom: '',
        specialite: '',
        session: '',
        dateNaissance: '',
        lieuNaissance: '',
        nationalite:'',
        cin_passport: '',
        dateRealisation: '',
        numeroDiplome: '',
        loading: false,
        web3: null, 
        contract: null, 
        account:null,
    }

    mystyle={
        backgroundImage: `url(${background})`,

  /* Full height */
  height: '100vh',
  width: 'auto',

  /* Center and scale the image nicely */
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '100%',
    }

   
    componentDidMount =  async () => {
        console.log(this.props)
        this.setState({hash: this.props.location.state.params.id})

        let data = await loadBlockchainData();
          this.setState({ account: (await data).accounts[0],web3: (await data).web3,contract: (await data).instance });
            let zz = await this.state.contract.methods.Certificates(this.state.hash).call();

          
            console.log(zz)
            this.setState({
                nom: zz[3],
                specialite: zz[1],
                session: zz[2],
                dateNaissance: epochToDate(zz[4]),
                lieuNaissance: zz[5],
                nationalite:zz[7],
                cin_passport: zz[6],
                dateRealisation: epochToDate(zz[10]),
                numeroDiplome: zz[9],
            })
            
            this.setState({loading:true})
            

    }

    

    render() {
        //console.log(this.state)
        if(this.state.loading){
        return (
            <div >


                <Container style={this.mystyle} >
               
                    <div >
                  
               <Form style={{textAlign: 'center'}}>
                   
            
               <br/><br/>
               <br/><br/>
               <br/><br/>
               
               <Row >
                   <Col style={{textAlign: 'center'}}>
                    <h2>DIPLÔME</h2><br/>
                    <h2>Le DIPLÔME National d'ingénieur</h2>
                    </Col>
                </Row>
              
               
                <Row>
                    <Col className="offset-1" xs="auto" >
                <Form.Label>Specialité : </Form.Label>
                <Form.Control type="text" value={this.state.specialite} readOnly></Form.Control>
                </Col>
                <Col xs="auto" className="offset-1">
                <Form.Label>Session : </Form.Label>
                <Form.Control type="text" value={this.state.session} readOnly></Form.Control>
                </Col>
                
                </Row>
                <br/><br/>
              
                <Row>
                <Col xs="auto" className="offset-1">
                <Form.Label>Nom et Prénom : </Form.Label>
                <Form.Control type="text" value={this.state.nom} readOnly/>
                </Col>
                </Row>

                <br/><br/>
               

                <Row>

                <Col xs="auto" className="offset-1" >
                <Form.Label>Date Naissance : </Form.Label>
                    <Form.Control name="dateNaissance" value={this.state.dateNaissance} readOnly></Form.Control>
                    </Col>

                    <Col xs="auto" >
                <Form.Label>Lieu de Naissance : </Form.Label>
                <Form.Control type="text" value={this.state.lieuNaissance}   readOnly />
                </Col>


               
                    <Col xs="auto" >
                <Form.Label>Cin/Passport : </Form.Label>
                <Form.Control type="text" value={this.state.cin_passport}  readOnly />
                </Col>
                

                    <Col xs="auto" className="offset-1" >
                <Form.Label>Nationalité : </Form.Label>
                <Form.Control type="text" value={this.state.nationalite} readOnly/>
                </Col>
                
                </Row>
                <br/><br/>
               

                <Row>
                    <Col xs="auto" className="offset-1">
                <Form.Label>Date Realisation Diplome : </Form.Label>
                    <Form.Control  name="dateRealisation" value={this.state.dateRealisation} readOnly></Form.Control>
                    </Col>

                    <Col xs="auto" className="offset-1">
                <Form.Label>Numéro Diplome : </Form.Label>
                <Form.Control type="text" value={this.state.numeroDiplome}  readOnly/>
                </Col>
                </Row>




                </Form>
                </div>
                </Container>
              
            </div>
        )}else{
            return(
                <div>
                    <div className="border border-light p-3 mb-4" style={{height:'100vh'}}>
            <div className="d-flex align-items-center justify-content-center" style={{height:'100vh'}}>
            <Loader visible={!this.state.loading} type="Rings" color="#007bff" height={200} width={200} timeout={5000} />
            </div>
            </div>
                </div>
            )
        }
    }
    
}

export default ViewCertificate

import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from "react";
import { Button, Col, Container, Form, FormGroup, Row, Spinner } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import { dateToEpoch, loadBlockchainData } from "../utils/helper.js";






class AddCertificate extends Component{



    state={
        nom: '',
        specialite: '',
        session: '',
        dateNaissance: new Date(),
        lieuNaissance: '',
        nationalite:'',
        cin_passport: '',
        dateRealisation: new Date(),
        numeroDiplome: '',
        txnHash: 0,
        CertificateContractAddress: 0,
        blockWitnessed: 0,
        loading: false,
        web3: null, 
        contract: null, 
        account:null,
        redirect:false,
        id:null,
        userid:''

    }

    

    componentDidMount = async () => {
        
          let data = loadBlockchainData();
          this.setState({ account: (await data).accounts[0],web3: (await data).web3,contract: (await data).instance,userid:this.props.match.params.userid });

    }

    handleSubmit = async (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        try {
           
             let c = await this.state.contract.methods.totalCertificates().call();

                  this.setState({id:c})
                  

            let transaction = await this.state.contract.methods.issueCertificate(
                this.state.nom,
                this.state.specialite,
                this.state.session,
                dateToEpoch(this.state.dateNaissance),
                this.state.lieuNaissance,
                this.state.cin_passport,
                this.state.nationalite,
                dateToEpoch(this.state.dateRealisation),
                this.state.numeroDiplome,
                this.state.userid)
                .send({ from: this.state.account });

                this.setState({
                    txnHash: transaction.transactionHash, blockWitnessed: transaction.blockNumber,
                  })

                  if(this.state.id != null)
                  {
                      this.setState({redirect:true})
                  }

        }catch(error){
            this.setState({redirect:true})
            console.log(error)
        }

        this.setState({ loading: false });
    }
    
    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state,callback)=>{
            return;
        };
    }

    render(){
        console.log(this.props)
        if(this.state.redirect===true){
            return(
                <Router>
            <Redirect from="/add" to={`/viewAll`} />
            </Router>
            )
        }else{
        return(
            
            <div className="App">
        

                <Container className="container-fluid">

                <Row>
                    <Col sm="12">
                <h1>Add Certificate</h1>
                    </Col>
                </Row>

                <Row>
                    <Col sm="12">
                <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formGroupEtudiant">
                <Form.Label>Nom et Prénom : </Form.Label>
                <Form.Control type="text" onChange={event => this.setState({nom: event.target.value})} placeholder="Nom et Prénom" />
                </Form.Group>
            

                <FormGroup >
                
                <Row>
                    <Col sm="12">
                <Form.Label>Date Naissance : </Form.Label>
                </Col>
                </Row>

                    <Row>
                    <Col sm="12">
                    <DatePicker className="form-control" dateFormat="dd/MM/yyyy" name="dateNaissance" selected={this.state.dateNaissance} onChange={event => this.setState({dateNaissance: event})}></DatePicker>
                    </Col>
                    </Row>
                </FormGroup>

                <Form.Group >
                <Form.Label>Lieu de Naissance : </Form.Label>
                <Form.Control type="text" onChange={event => this.setState({lieuNaissance: event.target.value})} placeholder="Lieu de Naissance" />
                </Form.Group>

                <Form.Group >
                <Form.Label>Cin/Passport : </Form.Label>
                <Form.Control onChange={event => this.setState({cin_passport: event.target.value})} type="text" placeholder="Cin/Passport" />
                </Form.Group>

                <Form.Group >
                <Form.Label>Nationalité : </Form.Label>
                <Form.Control type="text" onChange={event => this.setState({nationalite: event.target.value})} placeholder="Nationalité" />
                </Form.Group>

                <Form.Group >
                <Form.Label>Numéro Diplome : </Form.Label>
                <Form.Control onChange={event => this.setState({numeroDiplome: event.target.value})} type="text" placeholder="Numéro Diplome" />
                </Form.Group>

                <FormGroup>
                    <Row>
                        <Col sm="12">
                <Form.Label>Date Realisation Diplome : </Form.Label>
                        </Col>
                </Row>
                <Row>
                <Col sm="12">
                    <DatePicker className="form-control"  dateFormat="dd/MM/yyyy" name="dateRealisation" selected={this.state.dateRealisation} onChange={event => {this.setState({dateRealisation: event})}  }></DatePicker>
                    </Col>
                    </Row>
                </FormGroup>
                

                <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Specialité : </Form.Label>
                <Form.Control as="select" selected={this.state.specialite} onChange={event => this.setState({specialite: event.target.value})}>
                <option></option>
                <option>Informatique</option>
                <option>Electromécanique</option>
                <option>Génie Civil</option>
                </Form.Control>
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlSelect2">
                <Form.Label>Session : </Form.Label>
                <Form.Control type="text" placeholder="Session" onChange={event => this.setState({session: event.target.value})}>
                </Form.Control>
                </Form.Group>

                <FormGroup>
                    <Button type="submit" variant="primary" size="lg" block> { this.state.loading && <Spinner as="span" animation="border" size="lg" role="status" aria-hidden="true" /> }Add Certificate</Button>
                </FormGroup>

                </Form>
                    </Col>
                    </Row>
                </Container>
            </div>
        )}
    }
}

export default AddCertificate
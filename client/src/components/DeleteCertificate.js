import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Link } from "react-router-dom";
import { loadBlockchainData } from '../utils/helper';


export default class DeleteCertificate extends Component {
    
    state={
        hash:'',
        loading: false,
        web3: null, 
        contract: null, 
        account:null,
        
    }
    
    componentDidMount =  async () => {
        this.setState({hash: this.props.location.state.params.id})

        let data = await loadBlockchainData();
          this.setState({ account: (await data).accounts[0],web3: (await data).web3,contract: (await data).instance });
        await this.state.contract.methods.deleteCertificate(this.state.hash).send({ from: this.state.account });

        this.setState({loading:true})
    }
    



    render() {
        if(this.state.loading){
            return(
                <div>
                    <center>
                    Certificate Updated ....
                    <Link to="/viewAll" target="_parent" rel="noopener noreferrer">Go to View all</Link>
                    </center>
                </div>
            )
        }else
        {
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

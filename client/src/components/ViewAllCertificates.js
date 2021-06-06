import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { Container } from "react-bootstrap";
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Link } from 'react-router-dom';
import { epochToDate, loadBlockchainData } from '../utils/helper';





const { SearchBar } = Search;

export default class ViewAllCertificates extends Component {

  

  constructor(props){
    super(props);
    this.state = {
      web3: null,
      contract: null,
      account: null,
      certs: [],
      search: '',
      loaded: false,
      loading:true,
    }
  }

  expandRow = {
    renderer: (row, rowIndex) => (
      <div className="btn-toolbar ">
        <Link className="btn btn-round btn-success mr-3" to={{
            pathname:"/view/",
            state:{params:{id:row.id}}
        }}>
        View
        </Link>

        <Link className="btn btn-round btn-warning mr-3" to={{
            pathname:"/update/",
            state:{params:{id:row.id}}
        }}>
        Update
        </Link>

        <Link className="btn btn-round btn-danger" to={{
            pathname:"/delete/",
            state:{params:{id:row.id}}
        }}>
        Delete
        </Link>
      </div>
    )
  };

  columns = [
    {
      dataField: 'id',
      text: 'ID',
      hidden: true
    },
    {
      dataField: 'identifiant',
      text: 'Identifiant',
      sort: true
    },
    {
      dataField: 'Nom',
      text: 'Nom Etudiant',
      sort: true
    },
    {
      dataField: 'Nationalite',
      text: 'Nationalité',
      sort: true
    },
    {
      dataField: 'dateNaissance',
      text: 'Date Naissance',
      sort: true
    },
    {
      dataField: 'lieuNaissance',
      text: 'Lieu Naissance',
      sort: true
    },
    {
      dataField: 'Specialite',
      text: 'Specialite',
      sort: true
    },
    {
      dataField: 'Session',
      text: 'Session',
      sort: true
    },
    {
      dataField: 'numCertificat',
      text: 'Numero Certificat',
      sort: true
    },
    {
      dataField: 'dateRealisation',
      text: 'Date Realisation',
      sort: true
    },

  ];

  async init()
  {
    let data = await loadBlockchainData();
    this.setState({ account: (await data).accounts[0], web3: (await data).web3, contract: (await data).instance });
    let size = await this.state.contract.methods.totalCertificates().call();
    let certs = []


    for (let index = 0; index <= size - 1; index++) {
      let zz = await this.state.contract.methods.Certificates(index).call();
      if(zz['isDeleted']===false && zz['userid']===this.props.user)
      {
        zz['dateNaissance'] = epochToDate(zz['dateNaissance'])
        zz['dateRealisation'] = epochToDate(zz['dateRealisation'])
        certs.push(zz)
      }
    }
    this.setState({ certs: certs })
    this.setState({ loading: false })
   
  }


  componentDidMount = () => {
    this.init()
  }



  render() {
    console.log(this.state.certs)
    
    if (!this.state.loading) {
      
      return (
        <div>
          <Container style={{ height: '100vh' }}>
            <ToolkitProvider
              bootstrap4={true}
              keyField="id"
              data={this.state.certs}
              columns={this.columns}
              sort
              search={{
                defaultSearch: ''
              }}
            >
              {
                props => (
                  <div>


                    <br />
                    <SearchBar {...props.searchProps} />
                    <hr />

                    <BootstrapTable {...props.baseProps} pagination={paginationFactory()} expandRow={this.expandRow} sort={{ dataField: 'Session', order: 'asc' }} />


                  </div>
                )
              }
            </ToolkitProvider>
          </Container>


        </div>
      )
    }else{
      return (
        
        <div className="border border-light p-3 mb-4" style={{ height: '100vh' }}>
          <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
            <Loader visible={!this.state.loading} type="Rings" color="#007bff" height={200} width={200} timeout={3000} />
          </div>
          
        </div>
      )
    }
  }
}

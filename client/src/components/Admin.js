import React, { Component } from 'react'
import Header from '../components/HeaderAdmin'
import Footer from "../components/Footer";
import LoginRegister from "../components/LoginRegister";

export default class Admin extends Component {
    render() {
        return (
            <div className="App">
                <Header/>




                <Footer/>
                <LoginRegister/>
            </div>
        )
    }
}

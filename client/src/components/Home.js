import React, { Component, Fragment } from "react";
import About from "./About";
import Footer from "./Footer/index";
import Services from "./Services";

class Home extends Component{

    
    constructor(props) {
        super(props)
        this.About = React.createRef()  
    }
    
    render(){
        return(
            <div className="App">
                <Fragment>
                  
                   <Services/>
                    <About ref={this.About}/>
                   <Footer/>
                </Fragment>
            </div>
        )
    }
}

export default Home
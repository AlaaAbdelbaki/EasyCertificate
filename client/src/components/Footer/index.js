import React from 'react';
import { Link } from "react-router-dom";
import Logo from '../../assets/img/logo.png';
import List from "../UI/List";
import LI from "../UI/List/Item";
import Text from "../UI/Text";
import Widget from "../UI/Widget";
function Footer() {
    return (
        <footer className="footer-area sp-bottom">
            <div className="container">
                <div className="row mtn-1">
                    <div className="col-lg-4 order-4 order-lg-0">
                        <div className="widget-item">
                            <div className="about-widget">
                                <Link to={`${process.env.PUBLIC_URL + "/"}`}>
                                    <img src={Logo} alt="Logo"/>
                                </Link>

                                <Text>
                                    The Leading anti-fraud Service for Certificates with Blockchain Technology.
                                </Text>

                                <Text classes="copyright-txt">
                                    &copy; {new Date().getFullYear()} Easy-Certificate. All Rights Reserved.
                                </Text>
                            </div>
                        </div>
                    </div>

                   

                    <div className="col-md-4 col-lg-2 ml-auto">
                        <Widget title="Social Links">
                            <List classes="widget-list">
                                <LI><a href="https://facebook.com/EasyCertificate/" target={'_blank'} rel="noreferrer">Facebook</a></LI>
                                <LI><a href="https://twitter.com/EasyCertificate/" target={'_blank'} rel="noreferrer">Twitter</a></LI>

                            </List>
                        </Widget>
                    </div>

                  
                </div>
            </div>
        </footer>
    );
}

export default Footer;
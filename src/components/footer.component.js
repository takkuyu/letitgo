import React from 'react';
import '../styles/footer.css';



const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="footer_content d-flex flex-lg-row flex-column align-items-center justify-content-lg-start justify-content-center">
                            <div className="footer_logo"><a href="#">Letitgo.</a></div>
                            <div className="copyright ml-auto mr-auto">
                                Copyright Let-it-go © 2020. All rights reserved.
                        </div>
                            <div className="footer_social ml-lg-auto">
                                <ul>
                                    <li><a href="#"><i className="fab fa-pinterest" aria-hidden="true" /></a></li>
                                    <li><a href="#"><i className="fab fa-instagram" aria-hidden="true" /></a></li>
                                    <li><a href="#"><i className="fab fa-facebook" aria-hidden="true" /></a></li>
                                    <li><a href="#"><i className="fab fa-twitter" aria-hidden="true" /></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
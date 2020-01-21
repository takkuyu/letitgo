import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button,
} from 'reactstrap';



export default class LandingPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: ''
        }
    }


    render() {
        return (
            <section className='landing'>
                <div className='dark-overlay'>
                    <div className='landing-inner'>
                        <h1 className='x-large'>Developer Connector</h1>
                        <p className='lead'>
                            Create a developer profile/portfolio, share posts and get help from
                            other developers
                         </p>
                        <div className='buttons'>
                            <Link to='/register' className='btn btn-primary'>
                                Sign Up
                              </Link>
                            <Link to='/signin' className='btn btn-light'>
                                Login
                              </Link>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
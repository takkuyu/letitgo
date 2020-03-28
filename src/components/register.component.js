import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button,
} from 'reactstrap';

import { registerId } from '../actions/actions'
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        userid: state.userid
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // registerId: (value) => dispatch(registerId(value)) // onSerchChange is just a prop name to receive
    }
}

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onSetUsername = this.onSetUsername.bind(this);
        this.onSetEmail = this.onSetEmail.bind(this);
        this.onSetPassword = this.onSetPassword.bind(this);
    }


    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            picture: 'https://static.wixstatic.com/media/2cd43b_c8b287b934894e50ab64c97056ba8a38~mv2_d_2240_2240_s_2.png/v1/fill/w_2240,h_2240,al_c,q_90/file.jpg',
        }

        axios.post('http://localhost:3000/users/register', user)
            .then(response => {
                console.log(response);
                // sessionStorage.setItem('userid', JSON.stringify(response.data)); // response.data returns _id of the user from db
                sessionStorage.setItem('token', response.data.token);

                // this.props.registerId(response.data);

                // window.location = '/mainscreen';

            })
            .catch((error) => { console.log(error) });
    }

    onSetUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onSetEmail(e) {
        this.setState({
            email: e.target.value // target is textbox
        });
    }

    onSetPassword(e) {
        this.setState({
            password: e.target.value // target is textbox
        });
    }


    render() {
        return (
            <Container className="App">

                <header className="header">
                    <div className="container">
                        <div className="header_content d-flex align-items-center">
                            <div className="logo"><Link to="/" style={{ color: '#ff0000' }}>Letitgo.</Link></div>
                            <nav className="main_nav">
                                <ul>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/signin">Login</Link></li>
                                    <li><Link to="/register">Register</Link></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </header>

                <h2>Register</h2>
                <Form className="form" onSubmit={this.onSubmit}>
                    <Col>
                        <FormGroup>
                            <Label>Username</Label>
                            <Input
                                type="name"
                                name="name"
                                id="exampleName"
                                placeholder="John Smith"
                                onChange={this.onSetUsername}
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input
                                type="email"
                                name="email"
                                id="exampleEmail"
                                placeholder="myemail@email.com"
                                onChange={this.onSetEmail}
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="examplePassword">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                id="examplePassword"
                                placeholder="more than 5 characters"
                                onChange={this.onSetPassword}
                            />
                        </FormGroup>
                    </Col>
                    <Button >Submit</Button>
                </Form>
            </Container>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Register);

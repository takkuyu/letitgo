import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button,
} from 'reactstrap';
// import MainScreen from './mainscreen.component';



export default class Signin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            isProperUser: false
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onSetEmail = this.onSetEmail.bind(this);
        this.onSetPassword = this.onSetPassword.bind(this);

    }



    onSubmit(e) {
        e.preventDefault();

        const user = {
            email: this.state.email,
            password: this.state.password,
        }

        axios.post('http://localhost:3000/users/signin', user)
            .then(response => {

                if (response.data) {

                    sessionStorage.setItem('userid', JSON.stringify(response.data._id));
                    this.setState({
                        isProperUser: true,
                        username: response.data.username
                    })

                    user.username = response.data.username;

                    axios.post('http://localhost:3000/login/post', user)
                        .then(response => console.log(response));

                }
            })
            .catch((error) => { console.log(error) });
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

        if (this.state.isProperUser) {
            return (
                <Redirect to={{
                    pathname: '/mainscreen',
                    state: {
                        username: this.state.username,
                        email: this.state.email
                    }
                }} />
            );
        }

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

                <h2>Sign In</h2>
                <Form className="form" onSubmit={this.onSubmit}>
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
                    <p className="my-1">
                        Don't have an account? <Link to='/register'>Sign Up</Link>
                    </p>
                </Form>
            </Container>
        );
    }
}
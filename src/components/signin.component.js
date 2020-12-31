import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from 'reactstrap';
// import MainScreen from './mainscreen.component';

import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    userid: state.userid,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // registerId: (value) => dispatch(registerId(value))
  };
};

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onSetEmail = this.onSetEmail.bind(this);
    this.onSetPassword = this.onSetPassword.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password,
    };

    axios
      .post('http://localhost:3000/users/signin', user)
      .then((response) => {
        if (response.data.token) {
          // this.props.registerId(response.data.userId);
          // sessionStorage.setItem('userid', JSON.stringify(response.data.userId));
          sessionStorage.setItem('token', response.data.token);
          window.location = '/mainscreen';
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onSetEmail(e) {
    this.setState({
      email: e.target.value, // target is textbox
    });
  }

  onSetPassword(e) {
    this.setState({
      password: e.target.value, // target is textbox
    });
  }

  render() {
    return (
      <Container className="App">
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
          <Button>Submit</Button>
          <p className="my-1">
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>
        </Form>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin);

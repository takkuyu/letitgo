import React, { useState } from 'react'
import Modal from '../Modal/Modal';
import {
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
} from 'reactstrap';
import { useMutation, gql } from '@apollo/client';
import { isLoggedInVar, isLoginModalOpenVar } from '../../graphql/cache';
import { useAuthDispatch, useAuthState } from '../../context/auth';

const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      uid
      username
      email
      picture
      wishlist
      token
    }
  }
`;

export const Login = () => {
  const dispatch = useAuthDispatch()
  const { isLoggedin, isLoginModalOpen } = useAuthState();

  const [login, { error }] = useMutation(LOGIN_USER, {
    onCompleted({ login }) {
      if (login) {
        dispatch({ type: 'LOGIN', payload: login });
      }
    }
  });

  const [formValues, setFormValues] = useState({
    email: 'demo',
    password: 'demo'
  })

  const [errorMessage, setErrorMessage] = useState(null)

  const onSubmit = (e) => {
    e.preventDefault();

    // @TODO: Uncomment this for production.
    // if (formValues.email !== 'demo' || formValues.password !== 'demo') {
    //   setErrorMessage('Unknown user. Use "demo" for email and password for your demo.');
    //   return;
    // }

    login({ variables: { email: formValues.email, password: formValues.password } });
  }

  return (
    (
      (isLoginModalOpen && !isLoggedin) &&
      <Modal
        closeModal={() => dispatch({ type: 'TOGGLE_LOGIN_MODAL' })}
        modalWidth={900}
      >
        <Row className="login-modal mx-0">
          <Col sm={6} className="login-modal-left" >
            <div className="login-modal-left-content">
              <p className="login-modal-left-content__title">Log in to:</p>
              <ul>
                <li className="icon-check">List items for sale</li>
                <li className="icon-check">Message buyers and sellers</li>
                <li className="icon-check">Add items to your wish list</li>
                <li className="icon-check">Access to your account page to see your history and more</li>
              </ul>
            </div>
          </Col>
          <Col sm={6} className="login-modal-form">
            <Form onSubmit={onSubmit}>
              <p className="login-modal-form__title">Letitgo.</p>
              <p className="login-modal-form__copy">Buy or sell any item, anytime.</p>
              {
                errorMessage && <div className="login-modal-form__error-message">{errorMessage}</div>
              }
              <FormGroup className="mb-4">
                <Label>Email</Label>
                <Input
                  type="text"
                  name="email"
                  id="exampleEmail"
                  placeholder="Enter your email"
                  value={formValues.email}
                  onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
                />
              </FormGroup>
              <FormGroup className="mb-4">
                <Label for="examplePassword">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="examplePassword"
                  placeholder="Enter your password"
                  value={formValues.password}
                  onChange={(e) => setFormValues({ ...formValues, password: e.target.value })}
                />
              </FormGroup>
              <button className="button login-action-button">Log in</button>
              <p className="sign-up my-1">Signup is disabled in demo</p>
            </Form>
          </Col>
        </Row>
        <div className="demo-login-credentials">email: demo, password: demo</div>
      </Modal>
    )
  )
}

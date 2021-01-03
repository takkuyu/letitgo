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
import { useMutation, gql, useQuery } from '@apollo/client';
import { isLoggedInVar, isLoginModalOpenVar } from '../../graphql/cache';

const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      uid
      token
    }
  }
`;

const IS_LOGIN_MODAL_OPEN = gql`
  query IsLoginModalOpen {
    isLoginModalOpen @client
  }
`;

export const Login = () => {
  const { data: { isLoginModalOpen } } = useQuery(IS_LOGIN_MODAL_OPEN);

  const [login, { error }] = useMutation(LOGIN_USER, {
    onCompleted({ login }) {
      if (login) {
        localStorage.setItem('token', login.token);
        localStorage.setItem('userId', login.uid);
        isLoggedInVar(true);
        isLoginModalOpenVar(false);
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
    isLoginModalOpen && (
      <Modal closeModal={() => isLoginModalOpenVar(false)} modalWidth={900}>
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

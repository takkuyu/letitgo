import { useMutation } from '@apollo/client';
import React, { useEffect } from 'react';
import { useAuthDispatch } from '../../context/auth';
import { LOGIN_USER } from '../Login/Login';
/*
 * Demo handler.
 * login as another user to test real-time chat.
 */
const DemoLogin = ({ match, ...props }) => {
  // const userId = match.params.id;
  const dispatch = useAuthDispatch();

  const [login, { error }] = useMutation(LOGIN_USER, {
    onCompleted({ login }) {
      if (login) {
        dispatch({ type: 'LOGIN', payload: login });
        window.location.href = '/messages';
      }
    },
  });

  useEffect(() => {
    login({ variables: { email: 'bob@gmail.com', password: '123123' } });
  }, []);

  if (error) return <p>An error occured.</p>;

  return <div></div>;
};

export default DemoLogin;

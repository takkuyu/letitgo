import React from 'react';
import { Route } from 'react-router-dom';
import { useAuthState } from '../../context/auth';
import { Login } from '../Login/Login';
import { Redirect } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';

const PrivateRoute = ({
  component: Component,
  ...rest
}) => {
  const { isLoggedin, loading } = useAuthState();

  if (loading) return <Spinner />

  return (
    <Route
      {...rest}
      render={props =>
        isLoggedin ? (
          <Component {...props} />
        ) : (
            <Redirect to="/" />
          )
      }
    />
  )
};


export default PrivateRoute;

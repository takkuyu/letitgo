import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Routes from '../components/Routes/Routes';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Navigation from '../components/Navigation/Navigation';
import TopShortContent from '../components/TopCopy/TopCopy.jsx';
import { Login } from '../components/Login/Login';
import {
  useMutation,
  gql
} from "@apollo/client";
import { useAuthState, useAuthDispatch } from '../context/auth';

const LOAD_USER = gql`
  mutation LoadUser{
    loadUser {
      uid
      username
      email
      picture
      wishlist
      token
    }
  }
`;

const App = () => {
  const { user } = useAuthState();
  const dispatch = useAuthDispatch()

  const [loadUser, { error, loading: userLoading }] = useMutation(LOAD_USER, {
    onCompleted({ loadUser }) {
      if (loadUser) {
        dispatch({ type: 'LOAD_USER', payload: loadUser })
      }
    }
  });

  useEffect(() => {
    if (user) {
      loadUser();
    } else {
      dispatch({ type: 'COMPLETE_LOADING' })
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <main className="main">
          <Navigation />
          <TopShortContent />
          <Route component={Routes} />
        </main>
        <Footer />
        <Login />
      </BrowserRouter>
    </div>
  );
}

export default App;

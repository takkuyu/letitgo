import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Routes from './components/routes/routes';
import Header from './components/header/header.component';
import Footer from './components/footer/footer.component';
import Navigation from './components/navigation/navigation.component';
import TopShortContent from './components/top-short-content/top-short-content';
import { Login } from './components/Login/Login';
import {
  useQuery,
  gql
} from "@apollo/client";

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

const App = () => {
  const { data: { isLoggedIn } } = useQuery(IS_LOGGED_IN);

  return (
    <div className="App">
      <BrowserRouter>
        <Header isLoggedIn={isLoggedIn} />
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

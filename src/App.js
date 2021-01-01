import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Routes from './components/routes/routes';
import Header from './components/header/header.component';
import Footer from './components/footer/footer.component';
import Navigation from './components/navigation/navigation.component';
import TopShortContent from './components/top-short-content/top-short-content';
import {
  useQuery,
  gql
} from "@apollo/client";

const GET_USERS = gql`
  {
    users {
        username
        uid
      }
  }
`;

const App = () => {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  // console.log(data)

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
      </BrowserRouter>
    </div>
  );
}

export default App;

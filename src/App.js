import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LandingPage from "./components/landingpage.component";
import Routes from './components/routes';
import './App.css'


function App() {
  return (
    <Router>
        <Route path="/" exact　component={LandingPage} />
        <Route component={Routes} />
    </Router>
  );
}

export default App;


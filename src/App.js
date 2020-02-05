import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// import Navbar from "./components/navbar.component";
import LandingPage from "./components/landingpage.component";
// import Signin from "./components/signin.component";
// import MainScreen from "./components/mainscreen.component";
// import Register from "./components/register.component";
import Routes from './components/routes';
import './App.css'


export default class App extends Component() {


  render(){
    console.log('App.js');
    return (
      <Router>
        {/* <div > */}
          <Route path="/" exact　component={LandingPage} />
          <Route component={Routes} />
        {/* </div> */}
      </Router>
    );
  }
}


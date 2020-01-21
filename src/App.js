import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// import Navbar from "./components/navbar.component";
import LandingPage from "./components/landingpage.component";
// import Signin from "./components/signin.component";
// import MainScreen from "./components/mainscreen.component";
// import Register from "./components/register.component";
import Routes from './components/routes';



function App() {
  return (
    <Router>
      <div className="container">
        <Route path="/" exact　component={LandingPage} />
        <Route component={Routes} />
      </div>
    </Router>
  );
}

export default App;

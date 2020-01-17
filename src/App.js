import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Signin from "./components/signin.component";
import MainScreen from "./components/mainscreen.component";
import Register from "./components/register.component";



function App() {
  return (
    <Router>
      <div className="container">
        {/* <Signin /> */}
        {/* < br /> */}
        <Route path="/" exact　component={Signin} />
        <Route path="/register" exact　component={Register} />
        <Route path="/mainscreen" exact　component={MainScreen} />
      </div>
    </Router>
  );
}

export default App;

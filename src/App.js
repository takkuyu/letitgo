import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LandingPage from "./components/landingpage.component";
import Routes from './components/routes';
import './App.css'

// import MainScreen from "./components/mainscreen.component";
// import NewPost from "./components/newpost.component";
// import EditPosting from "./components/edit-posting.component";
// import Favorite from "./components/favorite.component";
// import Comment from "./components/comment.component";

function App() {
  return (
    <Router>
      <Route path="/" exact　component={LandingPage} />
      <Route component={Routes} />
    </Router>
  );
}

export default App;


import React, { Component } from 'react';
// this will let us link to different routes
import {Link} from 'react-router-dom';

export default class Navbar extends Component {
    render(){
        return(
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
            {/*  use Link instead of anchor tags. show which we're going to link to*/}
            <Link to="/mainscreen" className="navbar-brand">MarketPlace</Link>
            <div className="collpase navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
              <Link to="/newpost" className="nav-link">New Post</Link>
              </li>
              <li className="navbar-item">
              <Link to="/mainscreen" className="nav-link">Profile</Link>
              </li>
            </ul>
            </div>
          </nav>
        );
    }
}
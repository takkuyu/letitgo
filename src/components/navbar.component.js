import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "../styles/nav.css"

export default class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header className="header">
        <div className="header_container">
        <p style={{float:"right", padding:'10px 20px 0 0', fontSize:'16px'}}>Logged in as: <span style={{color:"#44a038"}}>Test User</span></p>
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="header_content d-flex flex-row align-items-center justify-content-start">
                  <div className="logo"><Link to="/mainscreen" style={{color:'#ff0000'}}>Letitgo.</Link></div>
                  <nav className="main_nav">
                    <ul>
                      <li><Link to="/mainscreen">Home</Link></li>
                      <li><Link to="/newpost">New Post</Link></li>
                      <li><Link to="/favorite">Favorite</Link></li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}
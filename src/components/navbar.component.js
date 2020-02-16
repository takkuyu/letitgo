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
          {/* <p className="currentuser" >Logged in as: <span>Test User</span></p> */}
          <div className="container">
                <p className="currentuser" >Logged in as: <span>Test User</span></p>
                {/* <div className="row"> */}
              {/* <div className="col"> */}
                <div className="header_content d-flex align-items-center">
                            {/* <p className="currentuser" >Logged in as: <span>Test User</span></p> */}

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
            {/* </div> */}
          {/* </div> */}
      </header>
    );
  }
}
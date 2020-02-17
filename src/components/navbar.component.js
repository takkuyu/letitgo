import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/nav.css"

const Navbar = () => {
  return (
    <header className="header">
      <div className="container">
        <p className="currentuser" >Logged in as: <span>Test User</span></p>
        <div className="header_content d-flex align-items-center">
          <div className="logo"><Link to="/" style={{ color: '#ff0000' }}>Letitgo.</Link></div>
          <nav className="main_nav">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/newpost">New Post</Link></li>
              <li><Link to="/favorite">Favorite</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
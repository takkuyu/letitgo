import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/nav.css"

function removeToken(){
  sessionStorage.removeItem('token')
}

const Navbar = () => {
  return (
    <header className="header">
      <div className="fluid-container" style={{ padding: '0 30px' }}>
        <div className="header_content d-flex align-items-center">
          <div className="logo"><Link to="/mainscreen" style={{ color: '#ff0000' }}>Letitgo.</Link></div>
          <nav className="main_nav">
            <ul>
              <li><Link to="/mainscreen">Home</Link></li>
              <li><Link to="/newpost">New Post</Link></li>
              <li><Link to="/favorite">Favorite</Link></li>
              <li><Link to="/profile">Account</Link></li>
              <li onClick={removeToken}><Link to="/" >Logout</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </header >
  );
}

export default Navbar;

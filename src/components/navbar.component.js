import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/nav.css"

const Navbar = () => {
  return (
    <header className="header">
      <div className="fluid-container" style={{ padding: '0 30px' }}>
        {/* <p className="currentuser" >Logged in as: <span>Test User</span></p> */}
        <div className="header_content d-flex align-items-center">
          <div className="logo"><Link to="/mainscreen" style={{ color: '#ff0000' }}>Letitgo.</Link></div>
          <nav className="main_nav">
            <ul>
              <li><Link to="/mainscreen">Home</Link></li>
              <li><Link to={{
                pathname: "/newpost",
                props: 'this.props.username'
              }}>
                New Post</Link>
              </li>
              <li>
                <Link to={{
                  pathname: "/favorite/" + JSON.parse(sessionStorage.getItem('userid')),
                }}>
                  Favorite</Link></li>
              <li><Link to={{
                pathname: "/profile/" + JSON.parse(sessionStorage.getItem('userid')),
              }}>
                Account</Link></li>
            <li><Link to="/">Logout</Link></li>
            </ul>
          </nav>
      </div>
      </div>
    </header >
  );
}

export default Navbar;

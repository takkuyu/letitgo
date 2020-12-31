import React from 'react';
import { Link } from 'react-router-dom';
import SearchBox from '../search-box.component';
import OverlayNavigation from '../overlay-navigation/overlay-navigation.component';

function removeToken() {
  // call this when logout to remove token from JWT.
  sessionStorage.removeItem('token');
}

const Header = () => {
  return (
    <>
      <header className="header" id="header">
        <p className="logo-text">
          <Link to="/">Letitgo.</Link>
        </p>
        <SearchBox />
        <nav className="header__nav">
          <ul>
            <li className="link-btn">
              <Link to="/newpost" className="icon-camera">
                Sell
              </Link>
            </li>
            <li className="link-btn reverse-color">
              <Link to="/signin">Log In</Link>
            </li>
            <li className="nav-toggle-btn">
              <i className="fas fa-bars"></i>
            </li>
          </ul>
        </nav>
      </header>
      <OverlayNavigation />
    </>
  );
};

export default Header;

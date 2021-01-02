import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import SearchBox from '../search-box.component';
import OverlayNavigation from '../overlay-navigation/overlay-navigation.component';
import { Fragment } from 'react';
import { isLoggedInVar, isLoginModalOpenVar } from '../../cache';

function removeToken() {
  localStorage.removeItem('token');
  isLoggedInVar(false);
}

const Header = ({ isLoggedIn, ...props }) => {
  return (
    <Fragment>
      <header className="header" id="header">
        <p className="logo-text">
          <Link to="/">Letitgo.</Link>
        </p>
        <SearchBox />
        <nav className="header__nav">
          <ul>
            <li className="link-btn reverse-color">
              <button className="button icon-camera" onClick={() => {
                if (!isLoggedIn) {
                  isLoginModalOpenVar(true)
                  return
                }
                props.history.push('/sell')
              }}>Sell</button>
            </li>
            <li className="link-btn reverse-color">
              <button className="button icon-user" onClick={() => {
                if (!isLoggedIn) {
                  isLoginModalOpenVar(true)
                  return
                }
                props.history.push('/profile')
              }}>Account</button>
            </li>
            {
              isLoggedIn ? (
                <li className="link-btn reverse-color">
                  <button className="button" onClick={() => {
                    removeToken();
                    props.history.push('/');
                  }}>Log out</button>
                </li>
              ) : (
                  <li className="link-btn reverse-color">
                    <button className="button" onClick={() => isLoginModalOpenVar(true)}>Log In</button>
                  </li>
                )
            }
          </ul>
        </nav>
      </header>
      <OverlayNavigation />
    </Fragment>
  );
};

export default withRouter(Header);

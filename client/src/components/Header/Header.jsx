import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import SearchBox from '../SearchBox/SearchBox';
import { Fragment } from 'react';
import { useAuthState, useAuthDispatch } from '../../context/auth';
import Navigation from '../Navigation/Navigation';

const Header = ({ isLoggedIn, ...props }) => {
  const { isLoggedin } = useAuthState();
  const dispatch = useAuthDispatch();
  const [isOverlayHeaderActive, setIsOverlayHeaderActive] = useState(false);

  const onClick = (path) => {
    if (!isLoggedin) {
      dispatch({ type: 'TOGGLE_LOGIN_MODAL' });
      return;
    }
    props.history.push(path);
    setIsOverlayHeaderActive(false);
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    props.history.push('/');
    setIsOverlayHeaderActive(false);
  };

  return (
    <Fragment>
      <header className="header">
        <p className="logo-text">
          <Link to="/">Letitgo.</Link>
        </p>
        <SearchBox />
        <nav className="header__nav">
          <ul>
            <li>
              <button
                className="button btn-color-orange icon-camera"
                onClick={() => onClick('/sell')}
              >
                Sell
              </button>
            </li>
            <li>
              <button
                className="button btn-color-orange icon-comments"
                onClick={() => onClick('/messages')}
              >
                Messages
              </button>
            </li>
            <li>
              <button
                className="text-button icon-user"
                onClick={() => onClick('/profile')}
              >
                Account
              </button>
            </li>
            {isLoggedin ? (
              <li>
                <button className="text-button" onClick={logout}>
                  Log out
                </button>
              </li>
            ) : (
              <li>
                <button
                  className="text-button"
                  onClick={() => dispatch({ type: 'TOGGLE_LOGIN_MODAL' })}
                >
                  Log In
                </button>
              </li>
            )}
          </ul>
        </nav>
        <div
          className="nav-toggle-button"
          onClick={() => setIsOverlayHeaderActive(!isOverlayHeaderActive)}
        >
          <span
            className={isOverlayHeaderActive ? 'icon-times' : 'icon-bars'}
          ></span>
        </div>
      </header>
      {isOverlayHeaderActive && (
        <div className="overlay-header">
          <nav className="header__nav mb-3">
            <ul>
              <li>
                <button
                  className="text-button"
                  onClick={() => onClick('/messages')}
                >
                  <i class="bi bi-chat h5 mb-0 mr-2"></i>Messages
                </button>
              </li>
              <li>
                <button
                  className="text-button"
                  onClick={() => onClick('/profile')}
                >
                  <i
                    class="bi bi-person h5 mb-0 mr-1 position-relative"
                    style={{ fontSize: '1.5rem', left: '-.2rem' }}
                  ></i>
                  Account
                </button>
              </li>
              {isLoggedin ? (
                <li>
                  <button className="text-button" onClick={logout}>
                    <i class="bi bi-box-arrow-left h5 mb-0 mr-2"></i>Log out
                  </button>
                </li>
              ) : (
                <li>
                  <button
                    className="text-button"
                    onClick={() => dispatch({ type: 'TOGGLE_LOGIN_MODAL' })}
                  >
                    <i class="bi bi-box-arrow-right h5 mb-0 mr-2"></i>Log In
                  </button>
                </li>
              )}
              <li>
                <button
                  className="sell-button button btn-color-orange text-center text-white"
                  onClick={() => onClick('/sell')}
                >
                  List an item
                </button>
              </li>
            </ul>
          </nav>
          <p className="h5 pb-0">Shop</p>
          <Navigation
            closeOverlayHeader={() => setIsOverlayHeaderActive(false)}
          />
        </div>
      )}
    </Fragment>
  );
};

export default withRouter(Header);

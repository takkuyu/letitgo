import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import SearchBox from '../SearchBox/SearchBox';
import { Fragment } from 'react';
import { useAuthState, useAuthDispatch } from '../../context/auth';


const Header = ({ isLoggedIn, ...props }) => {
  const { isLoggedin } = useAuthState();
  const dispatch = useAuthDispatch()

  const onClick = (path) => {
    if (!isLoggedin) {
      dispatch({ type: 'TOGGLE_LOGIN_MODAL' })
      return
    }
    props.history.push(path)
  }

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    props.history.push('/');
  }

  return (
    <Fragment>
      <header className="header" id="header">
        <p className="logo-text">
          <Link to="/">Letitgo.</Link>
        </p>
        <SearchBox />
        <nav className="header__nav">
          <ul>
            <li>
              <button className="button btn-color-orange icon-camera" onClick={() => onClick('/sell')}>Sell</button>
            </li>
            <li>
              <button className="button btn-color-orange icon-comments" onClick={() => onClick('/messages')}>Messages</button>
            </li>
            <li>
              <button className="text-button icon-user" onClick={() => onClick('/profile')}>Account</button>
            </li>
            {
              isLoggedin ? (
                <li>
                  <button className="text-button" onClick={logout}>Log out</button>
                </li>
              ) : (
                  <li>
                    <button className="text-button" onClick={() => dispatch({ type: 'TOGGLE_LOGIN_MODAL' })}>Log In</button>
                  </li>
                )
            }
          </ul>
        </nav>
      </header>
    </Fragment>
  );
};

export default withRouter(Header);

import React from 'react';
import Navigation from '../../Navigation/Navigation';

const OverlayHeader = ({ onClick, dispatch }) => {
  return (
    <div className="overlay-header">
      <nav className="header__nav mb-3">
        <ul>
          <li>
            <button className="text-button" onClick={() => onClick('/messages')}>
              <i class="bi bi-chat h5 mb-0 mr-2"></i>Messages
          </button>
          </li>
          <li>
            <button className="text-button" onClick={() => onClick('/profile')}>
              <i class="bi bi-person h5 mb-0 mr-1 position-relative" style={{ fontSize: '1.5rem', left: '-.2rem' }}></i>Account
          </button>
          </li>
          {
            isLoggedin ? (
              <li>
                <button className="text-button" onClick={logout}>Log out</button>
              </li>
            ) : (
                <li>
                  <button className="text-button" onClick={() => dispatch({ type: 'TOGGLE_LOGIN_MODAL' })}>
                    <i class="bi bi-box-arrow-right h5 mb-0 mr-2"></i>Log In
                </button>
                </li>
              )
          }
          <li>
            <button className="sell-button button btn-color-orange text-center text-white" onClick={() => onClick('/sell')}>List an item</button>
          </li>
        </ul>
      </nav>
      <p className='h5 pb-0'>Shop</p>
      <Navigation isMobileView={true} />
    </div>
  );
};

export default OverlayHeader;

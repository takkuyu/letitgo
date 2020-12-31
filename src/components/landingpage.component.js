import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Footer from './footer.component';

const LandingPage = () => {
  if (sessionStorage.getItem('token')) {
    return <Redirect to="/mainscreen" />;
  }

  return (
    <div className="landing-outer">
      <header className="header">
        <div className="container">
          <div className="header_content d-flex align-items-center">
            <div className="logo">
              <Link to="/" style={{ color: '#ff0000' }}>
                Letitgo.
              </Link>
            </div>
            <nav className="main_nav">
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/signin">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <section className="landing">
        <div className="landing-container">
          <p className="catch-copy">
            You don't need <span style={{ color: '#ff0000' }}>it</span>
            <br /> anymore?
            <br />
            Okey,then let "<span style={{ color: '#ff0000' }}>it</span>" go !
          </p>
          <p className="description">
            Sell what you don’t need and find great deals on what you want.
          </p>
          <div className="buttons">
            <Link
              to="/register"
              className="btn btn-primary"
              style={{ marginRight: '20px' }}
            >
              Sign Up
            </Link>
            <Link to="/signin" className="btn btn-light">
              Login
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default LandingPage;

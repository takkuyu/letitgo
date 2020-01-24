import React, { Component } from 'react';
// this will let us link to different routes
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        {/*  use Link instead of anchor tags. show which we're going to link to*/}
        <Link to="/mainscreen" className="navbar-brand">Reactgram</Link>
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/newpost" className="nav-link">New Post</Link>
            </li>
            <li className="navbar-item">
              {/* <Link to="/favorite" className="nav-link">Favorite</Link> */}
              <Link to={{
                pathname: "/favorite",
                aboutProps: this.props.liked
              }}
                className="nav-link"
              >Favorite</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
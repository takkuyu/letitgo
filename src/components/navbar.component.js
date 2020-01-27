import React, { Component } from 'react';
// this will let us link to different routes
import { Link } from 'react-router-dom';
import "../styles/nav.css"

export default class Navbar extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      // <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      //   {/*  use Link instead of anchor tags. show which we're going to link to*/}
      //   <Link to="/mainscreen" className="navbar-brand">Reactgram</Link>
      //   <div className="collpase navbar-collapse">
      //     <ul className="navbar-nav mr-auto">
      //       <li className="navbar-item">
      //         <Link to="/newpost" className="nav-link">New Post</Link>
      //       </li>
      //       <li className="navbar-item">
      //         {/* <Link to="/favorite" className="nav-link">Favorite</Link> */}
      //         <Link to={{
      //           pathname: "/favorite",
      //           aboutProps: this.props.liked
      //         }}
      //           className="nav-link"
      //         >Favorite</Link>
      //       </li>
      //     </ul>
      //   </div>
      // </nav>

      <header className="header">
        <div className="header_container">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="header_content d-flex flex-row align-items-center justify-content-start">
                  <div className="logo"><Link to="/mainscreen" style={{color:'#ff0000'}}>Letitgo.</Link></div>
                  <nav className="main_nav">
                    <ul>
                      {/* <li class="hassubs active"> */}
                        {/* <a href="#">Home</a>
                        <ul>
                          <li><a href="categories.html">Categories</a></li>
                          <li><a href="product.html">Product</a></li>
                          <li><a href="cart.html">Cart</a></li>
                          <li><a href="checkout.html">Check out</a></li>
                          <li><a href="contact.html">Contact</a></li>
                        </ul>
                      </li>
                      <li class="hassubs">
                        <a href="categories.html">Post</a>
                        <ul>
                          <li><a href="categories.html">Category</a></li>
                          <li><a href="categories.html">Category</a></li>
                          <li><a href="categories.html">Category</a></li>
                          <li><a href="categories.html">Category</a></li>
                          <li><a href="categories.html">Category</a></li>
                        </ul>
                      </li> */}
                      <li><Link to="/mainscreen">Home</Link></li>
                      <li><Link to="/newpost">New Post</Link></li>
                      <li><Link to="/favorite">Favorite</Link></li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}
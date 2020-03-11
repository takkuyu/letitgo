import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/landingpage.css"
import Footer from "./footer.component";
import "../styles/nav.css"

// import { useSelector, useDispatch } from 'react-redux'
import { registerId } from '../actions/actions'
import { connect } from 'react-redux';

//tell me what state I need to listen to and send down as props.
const mapStateToProps = state => {
    return {
        counter: state.userid
    }
}

//tell me what props I should listen to that are actions that need to get dispatched.
const mapDispatchToProps = (dispatch) => {
    return {
        registerId: (value) => dispatch(registerId(value)) // onSerchChange is just a prop name to receive
    }
}

class LandingPage extends React.Component {

    // const counter = useSelector(state => state.counter);
    // console.log(counter);
    // const dispatch = useDispatch();

    // constructor(){

    // }

    
    render(){
        // const { incrementValue } = this.props;
        console.log(this.props.counter)
        return (
            <div className="landing-outer">
                <header className="header">
                    <div className="container">
                        <div className="header_content d-flex align-items-center">
                            <div className="logo"><Link to="/" style={{ color: '#ff0000' }}>Letitgo.</Link></div>
                            <nav className="main_nav">
                                <ul>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/signin">Login</Link></li>
                                    <li><Link to="/register">Register</Link></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </header>
    
                <section className='landing'>
                    <div className='landing-container'>
                <button onClick={() => this.props.registerId('abc10')}>++++++++</button>
                        <p className='catch-copy'>You don't need <span style={{ color: "#ff0000" }}>it</span><br /> anymore?<br />Okey,then let "<span style={{ color: "#ff0000" }}>it</span>" go !</p>
                        <p className='description'>Sell what you don’t need and find great deals on what you want.</p>
                        <div className='buttons'>
                            <Link to='/register' className='btn btn-primary' style={{ marginRight: '20px' }}>
                                Sign Up
                                  </Link>
                            <Link to='/signin' className='btn btn-light'>
                                Login
                                  </Link>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);

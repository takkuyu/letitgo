import React, { Component } from 'react';
import axios from 'axios';
import {
    Container,
    Row
} from 'reactstrap';

import Navbar from "./navbar.component";
import CardList from "./CardList.component";
import Footer from "./footer.component";
import "../styles/mainscreen.css"

import { connect } from 'react-redux';
import { registerId } from '../actions/actions'
//tell me what state I need to listen to and send down as props.
const mapStateToProps = state => {
    return {
        counter: state.counter
    }
}

//tell me what props I should listen to that are actions that need to get dispatched.
const mapDispatchToProps = (dispatch) => {
    return {
        registerId: (value) => dispatch(registerId(value)) // onSerchChange is just a prop name to receive
    }
}


const SearchBox = ({ searchChange }) => {
    return (
        <div className="searchBar">
            <input type="search" className="searchTerm" placeholder="What are you looking for?" onChange={searchChange} />
            <i className="fa fa-search"></i>
        </div>
    );
}

class MainScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            postings: [],
            searchfield: '',
            currentUser: {
                username: '',
                id: ''
            }
        };

        this.deletePosting = this.deletePosting.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);

        if(JSON.parse(sessionStorage.getItem('userid')) == null){ // go back to landing page if the session variable is not set
            console.log('not set')
            window.location = '/';
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3000/postings/') // get all the postings on postings table
            .then(response => {
                this.setState({ postings: response.data }) // get all the info of postings and set it to the posting state.
                axios.get('http://localhost:3000/users/' + JSON.parse(sessionStorage.getItem('userid')))
                    .then(response => {
                        this.setState({ 
                            currentUser: {
                                username:response.data.username,
                                id:response.data._id
                            }
                        })
                    })
                    .catch((error) => { console.log(error) });
            })
            .catch((error) => { console.log(error) });

    }

    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value });
    }

    deletePosting(id) {

        if (!window.confirm('Are you sure to delete?')) {
            return;
        }

        const deletedId ={
            deletedId: id
        }

        axios.post('http://localhost:3000/users/deleteLikeFromAll', deletedId)
            .then(console.log)
            .catch(console.log);

        axios.delete('http://localhost:3000/postings/' + id)
            .then(res => {
                console.log(res.data)
            });

        this.setState({
            postings: this.state.postings.filter(el => el._id !== id)
        })
    }

    postingList() {
        const fileredPosts = this.state.postings.filter(posting => {
            return posting.title.toLowerCase().includes(this.state.searchfield.toLowerCase());
        });

        return fileredPosts.map(posting => {

            const date = new Date(posting.createdAt);
            const createdAt = String(date).substring(0,15);

            return (
                <CardList
                    posting={posting}
                    currentUser={this.state.currentUser} // pass username, userid to cardlist component
                    key={posting._id}
                    deletePosting={this.deletePosting}
                    createdAt = {createdAt}
                />
            );
        })
    }

    render() {
        // const { counter, incrementValue } = this.props;

        console.log(this.props.counter)

        return (
            <div>
                <Container className="App">
                    <Navbar />
                    <SearchBox searchChange={this.onSearchChange} />
                    <div className="products">
                        <Row className="products-container">
                            {this.postingList()}
                        </Row>
                    </div>
                </Container>
                <Footer />
            </div >
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);

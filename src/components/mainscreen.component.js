import React, { Component } from 'react';
import axios from 'axios';
import {
    Container,
    Row
} from 'reactstrap';

import Navbar from "./navbar.component";
import Card from "./card.component";
import Footer from "./footer.component";
import "../styles/mainscreen.css"
// import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { storePostings, storeUserId, storeSearchField } from '../actions/actions';

//tell me what state I need to listen to and send down as props.
const mapStateToProps = (state) => {
    return {
        userid: state.user.id,
        postings: state.postings,
        searchfield: state.inputs.searchfield,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        storePostings: (value) => dispatch(storePostings(value)),
        storeUserId: (value) => dispatch(storeUserId(value)),
        storeSearchField: (value) => dispatch(storeSearchField(value)),
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
        // this.state = {
        //     postings: [],
        //     searchfield: '',
        //     userid: '',
        // };

        this.deletePosting = this.deletePosting.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);

        // if(JSON.parse(sessionStorage.getItem('userid')) == null){ // go back to landing page if the session variable is not set
        //     console.log('not set')
        //     window.location = '/';
        // }

        // console.log(this.props.userid)
    }

    componentDidMount() {
        // this._isMounted = true;

        axios.get('http://localhost:3000/postings/', { headers: { "Authorization": `Bearer ${sessionStorage.getItem('token')}` } }) // get all the postings on postings table
            .then(response => {
                // this.setState({
                //     postings: response.data.postings,
                //     userid: response.data.userid
                // });

                this.props.storePostings(response.data.postings);
                this.props.storeUserId(response.data.userid);
            })
            .catch(() => {
                //If the token was deleted or does not exist, redirect to root 
                window.location = '/';
            });
    }

    onSearchChange = (event) => {
        // this.setState({ searchfield: event.target.value });
        this.props.storeSearchField(event.target.value);

    }

    deletePosting(id) {

        if (!window.confirm('Are you sure to delete?')) {
            return;
        }


        axios.post('http://localhost:3000/users/deleteLikeFromAll', { deletedId: id })
            .then(console.log)
            .catch(console.log);

        axios.delete('http://localhost:3000/postings/' + id)
            .then(res => {
                console.log(res.data)
            });

        // this.setState({
        //     postings: this.props.postings.filter(el => el._id !== id)
        // })

        this.props.storePostings(this.props.postings.filter(el => el._id !== id));
    }

    postingList() {
        const fileredPosts = this.props.postings.filter(posting => {
            return posting.title.toLowerCase().includes(this.props.searchfield.toLowerCase());
        });

        return fileredPosts.map(posting => {

            const date = new Date(posting.createdAt);
            const createdAt = String(date).substring(0, 15);

            return (
                <Card
                    posting={posting}
                    userid={this.props.userid} // pass username, userid to cardlist component
                    key={posting._id}
                    deletePosting={this.deletePosting}
                    createdAt={createdAt}
                />
            );
        })
    }

    render() {
        // console.log(this.props.userid)
        // console.log(this.props.searchfield)

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

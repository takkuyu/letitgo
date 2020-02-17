import React, { Component } from 'react';
import axios from 'axios';
import {
    Container,
    Row
} from 'reactstrap';

import Navbar from "./navbar.component";
import CardList from "./card.component";
import Footer from "./footer.component";
import "../styles/mainscreen.css"

const SearchBox = ({ searchChange }) => {
    return (
        <div className="searchBar">
            <input type="search" className="searchTerm" placeholder="What are you looking for?" onChange={searchChange} />
            <i className="fa fa-search"></i>
        </div>
    );
}

export default class MainScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            postings: [],
            liked: '',
            searchfield: '',
            loginedUser: {
                username: 'Test User',
                email: 'test@gmail.com'
            }
        };

        this.deletePosting = this.deletePosting.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);

    }

    componentDidMount() {
        axios.get('http://localhost:3000/postings/')
            .then(response => {
                this.setState({ postings: response.data }) // get all the info of postings and set it to the posting state.
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

        axios.get('http://localhost:3000/postings/' + id)
            .then(res => {
                console.log(res.data.image)

                const image = {
                    image: res.data.image
                }

                axios.post('http://localhost:3000/likes/image', image)
                    .then(res => {
                        console.log(res)
                        if (res.data === false) {
                            return
                        }
                        axios.delete('http://localhost:3000/likes/' + res.data) 
                            .then(res => console.log(res.data))
                            .catch(console.log);
                    })
                    .catch(console.log);
            });

        axios.delete('http://localhost:3000/postings/' + id)
            .then(res => {
                console.log(res.data)
            })
        this.setState({
            postings: this.state.postings.filter(el => el._id !== id)
        })
    }

    postingList() {
        const fileredPosts = this.state.postings.filter(posting => {
            return posting.title.toLowerCase().includes(this.state.searchfield.toLowerCase());
        });

        return fileredPosts.map(posting => {
            return (
                <CardList
                    posting={posting}
                    loginedUser={this.state.loginedUser.username}
                    key={posting._id}
                    deletePosting={this.deletePosting}
                />
            );
        })
    }


    render() {
        return (
            <div>
                <Container className="App">
                    <Navbar username={this.state.loginedUser.username} liked={this.state.liked} />
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
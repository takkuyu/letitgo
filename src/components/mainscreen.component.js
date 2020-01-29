import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import {
    Container,
    Row
} from 'reactstrap';

import Navbar from "./navbar.component";
import CardList from "./card.component";
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
            // username: '',
            liked: '',
            searchfield: '',
            loginedUser: {
                username: 'Test User',
                email: 'test@gmail.com'
            }
        };

        this.deletePosting = this.deletePosting.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        // this.getLikedPosting = this.getLikedPosting.bind(this);

    }

    componentDidMount() {
        axios.get('http://localhost:3000/postings/')
            .then(response => {
                this.setState({ postings: response.data }) // get all the info of exercide fields and set it to the exercises state.
                // console.log(this.state.postings)

                // axios.get('http://localhost:3000/login/')
                //     .then(response => console.log(response.data[response.data.length - 1]));
            })
            .catch((error) => { console.log(error) });

        // if(this.props.location.state === undefined){
        //     return;
        // }
        // this.setState({
        //     user: this.props.location.state
        // })
    }

    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value });
    }

    // getLikedPosting(id){

    //     console.log(id)
    //     this.setState({
    //         liked:id
    //     })
    // }

    deletePosting(id) {

        if (!window.confirm('Are you sure to delete?')) {
            return;
        }

        // console.log('http://localhost:3000/postings/' + id)

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
                        axios.delete('http://localhost:3000/likes/' + res.data) // post with the id of the liked posting to delete
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

        // return this.state.postings.map(posting => {
        //     return (
        //         <CardList
        //             posting={posting}
        //             key={posting._id}
        //             deletePosting={this.deletePosting}
        //         />
        //     );
        // })

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
        // console.log(this.state.user)

        return (
            <Container className="App">
                <Navbar username={this.state.loginedUser.username} liked={this.state.liked} />
                <SearchBox searchChange={this.onSearchChange} />
                <div className="products">
                    <Row className="products-container">
                        {this.postingList()}
                    </Row>
                </div>
                {/* 
                <Row>
                    <Col md={'4'}>
                        <div className="product">
                            <div className="product_image"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg2HMn87JnkCcyYo41iQSJmZJYtID_X0CPp8s2ctVrvUgp0VY&s" alt="" /></div>
                            <div className="product_content">
                                <div className="product_title"><a href="product.html">Smart Phone</a></div>
                                <div className="product_price">$670</div>
                            </div>
                        </div>
                    </Col>
                    <Col md={'4'}>
                        <div className="product">
                            <div className="product_image"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg2HMn87JnkCcyYo41iQSJmZJYtID_X0CPp8s2ctVrvUgp0VY&s" alt="" /></div>
                            <div className="product_content">
                                <div className="product_title"><a href="product.html">Smart Phone</a></div>
                                <div className="product_price">$670</div>
                            </div>
                        </div>
                    </Col>
                    <Col md={'4'}>
                        <div className="product">
                            <div className="product_image"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg2HMn87JnkCcyYo41iQSJmZJYtID_X0CPp8s2ctVrvUgp0VY&s" alt="" /></div>
                            <div className="product_content">
                                <div className="product_title"><a href="product.html">Smart Phone</a></div>
                                <div className="product_price">$670</div>
                            </div>
                        </div>
                    </Col>
                    <Col md={'4'}>
                        <div className="product">
                            <div className="product_image"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg2HMn87JnkCcyYo41iQSJmZJYtID_X0CPp8s2ctVrvUgp0VY&s" alt="" /></div>
                            <div className="product_content">
                                <div className="product_title"><a href="product.html">Smart Phone</a></div>
                                <div className="product_price">$670</div>
                            </div>
                        </div>
                    </Col>
                    <Col md={'4'}>
                        <div className="product">
                            <div className="product_image"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg2HMn87JnkCcyYo41iQSJmZJYtID_X0CPp8s2ctVrvUgp0VY&s" alt="" /></div>
                            <div className="product_content">
                                <div className="product_title"><a href="product.html">Smart Phone</a></div>
                                <div className="product_price">$670</div>
                            </div>
                        </div>
                    </Col>
                    <Col md={'4'}>
                        <div className="product">
                            <div className="product_image"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg2HMn87JnkCcyYo41iQSJmZJYtID_X0CPp8s2ctVrvUgp0VY&s" alt="" /></div>
                            <div className="product_content">
                                <div className="product_title"><a href="product.html">Smart Phone</a></div>
                                <div className="product_price">$670</div>
                            </div>
                        </div>
                    </Col>
                    <Col md={'4'}>
                        <div className="product">
                            <div className="product_image"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg2HMn87JnkCcyYo41iQSJmZJYtID_X0CPp8s2ctVrvUgp0VY&s" alt="" /></div>
                            <div className="product_content">
                                <div className="product_title"><a href="product.html">Smart Phone</a></div>
                                <div className="product_price">$670</div>
                            </div>
                        </div>
                    </Col>
                    <Col md={'4'}>
                        <div className="product">
                            <div className="product_image"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg2HMn87JnkCcyYo41iQSJmZJYtID_X0CPp8s2ctVrvUgp0VY&s" alt="" /></div>
                            <div className="product_content">
                                <div className="product_title"><a href="product.html">Smart Phone</a></div>
                                <div className="product_price">$670</div>
                            </div>
                        </div>
                    </Col>
                </Row> */}

            </Container>
        );
    }
}
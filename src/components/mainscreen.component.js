import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import {
    Container,
    Row,
    // FormGroup, Label, Input,
    // Button,
} from 'reactstrap';

import Navbar from "./navbar.component";
import CardList from "./card.component";

export default class MainScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            postings: [],
            loginuser: '',
            liked: ''
        };

        this.deletePosting = this.deletePosting.bind(this);
        // this.getLikedPosting = this.getLikedPosting.bind(this);

    }

    componentDidMount() {
        axios.get('http://localhost:3000/postings/')
            .then(response => {
                this.setState({ postings: response.data }) // get all the info of exercide fields and set it to the exercises state.
                // console.log(this.state.postings)
            })
            .catch((error) => { console.log(error) });

        // this.setState({
        //     loginuser: this.props.location.state.username
        // })
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
        return this.state.postings.map(posting => {
            return (
                <CardList
                    posting={posting}
                    key={posting._id}
                    deletePosting={this.deletePosting}
                />
            );
        })
    }


    render() {

        return (
            <Container className="App">
                <Navbar loginuser={this.state.loginuser} liked={this.state.liked} />
                <Row>
                    {this.postingList()}
                </Row>
            </Container>
        );
    }
}
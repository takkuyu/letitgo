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
            postings: []
        };

        this.deletePosting = this.deletePosting.bind(this);

    }

    componentDidMount() {
        axios.get('http://localhost:3000/postings/')
            .then(response => {
                this.setState({ postings: response.data }) // get all the info of exercide fields and set it to the exercises state.
                console.log(this.state.postings)
            })
            .catch((error) => { console.log(error) });
    }

    deletePosting(id) {

        if (!window.confirm('Are you sure to delete?')) {
            return;
        }
  
            axios.delete('http://localhost:3000/postings/' + id)
                .then(res => console.log(res.data));
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
                <Navbar />
                <Row>
                    {this.postingList()}
                </Row>
            </Container>
        );
    }
}
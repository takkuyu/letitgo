import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import axios from 'axios';
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button,
} from 'reactstrap';
import Navbar from "./navbar.component";

export default class NewPost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            location: '',
            price: 0,
            image: '',
            condition: '',
            description: '',
            loading: false,
            errorInputs: false,
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onSetTitle = this.onSetTitle.bind(this);
        this.onSetLocation = this.onSetLocation.bind(this);
        this.onSetPrice = this.onSetPrice.bind(this);
        this.onSetCondition = this.onSetCondition.bind(this);
        this.onSetDescription = this.onSetDescription.bind(this);
        this.uploadImage = this.uploadImage.bind(this);


    }

    uploadImage = async e => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'myreactapp')
        this.setState({
            loading: true
        })
        const res = await fetch(
            'https://api.cloudinary.com/v1_1/dh1mwdsag/image/upload',
            {
                method: 'POST',
                body: data
            }
        )
        const file = await res.json()
        this.setState({
            image: file.secure_url
        })
        this.setState({
            loading: false
        })
    }

    onSubmit(e) {
        e.preventDefault();


        const posting = {
            // createdby: this.props.match.params.id,
            title: this.state.title,
            location: this.state.location,
            price: this.state.price,
            condition: this.state.condition,
            image: this.state.image,
            description: this.state.description,
        }

        axios.post('http://localhost:3000/postings/post', posting, { headers: {"Authorization" : `Bearer ${sessionStorage.getItem('token')}`} })
            .then(response => {
                console.log(response);
                window.location = '/mainscreen';
            })
            .catch(() => {
                this.setState({
                    errorInputs: true
                })
            });
    }

    onSetTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    onSetLocation(e) {
        this.setState({
            location: e.target.value
        });
    }

    onSetPrice(e) {
        this.setState({
            price: e.target.value
        });
    }

    onSetCondition(e) {
        this.setState({
            condition: e.target.value
        });
    }

    onSetDescription(e) {
        this.setState({
            description: e.target.value
        });
    }


    render() {
        return (
            <Container className="App" style={{ paddingBottom: '30px' }}>
                <Navbar />
                <h2>New Post</h2>
                <Form className="form" onSubmit={this.onSubmit}>
                    <Col>
                        <FormGroup>
                            <Label>Title</Label>
                            <Input
                                type="text"
                                name="text"
                                id="title"
                                placeholder="Enter a title"
                                onChange={this.onSetTitle}
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label>Price</Label>
                            <Input
                                type="number"
                                name="price"
                                id="price"
                                placeholder="Enter a price"
                                onChange={this.onSetPrice}
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="select">Condition</Label>
                            <Input type="select" name="select" id="select" onChange={this.onSetCondition} defaultValue="desc">
                                <option value="desc" disabled>Choose one</option>
                                <option>New</option>
                                <option>Very Good</option>
                                <option>Good</option>
                                <option>Bad</option>
                                <option>Very Bad</option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                id="location"
                                placeholder="Enter a location"
                                onChange={this.onSetLocation}
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label>Upload Image</Label>
                            <Input
                                type="file"
                                name="file"
                                placeholder="Upload an image"
                                onChange={this.uploadImage}
                                style={{ marginBottom: '10px' }}
                            />
                            {this.state.loading ? (
                                <h3>Loading...</h3>
                            ) : (
                                    <img src={this.state.image} alt="" style={{ width: '300px' }} />
                                )}
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label>Description</Label>
                            <Input
                                type="textarea"
                                name="testarea"
                                id="Description"
                                placeholder="Describe your item here"
                                onChange={this.onSetDescription}
                                style={{
                                    height: '200px',
                                }}
                            />
                        </FormGroup>
                    </Col>
                    {
                        this.state.errorInputs ?
                            <h4 style={{ color: '#ff0000' }}>One or more inputs are empty ! Please fill in all the inputs.</h4>
                            :
                            <div></div>
                    }
                    <Button className='btn-danger' style={{ color: 'white', width: '100px' }}>Post</Button>
                </Form>
            </Container>
        );
    }
}
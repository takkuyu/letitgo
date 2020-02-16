import React, { Component } from 'react';
import {Redirect } from 'react-router-dom';
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
            loading: false,
            description: '',
            isProperInfo: false,
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onSetTitle = this.onSetTitle.bind(this);
        this.onSetLocation = this.onSetLocation.bind(this);
        this.onSetPrice = this.onSetPrice.bind(this);
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
        // console.log(file.secure_url)
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
            createdby: 'Test User',
            profilePic: 'https://static.wixstatic.com/media/2cd43b_c8b287b934894e50ab64c97056ba8a38~mv2_d_2240_2240_s_2.png/v1/fill/w_2240,h_2240,al_c,q_90/file.jpg',
            title: this.state.title,
            location: this.state.location,
            price: this.state.price,
            image: this.state.image,
            description: this.state.description,
        }

        axios.post('http://localhost:3000/postings/post', posting)
            .then(response => {
                console.log(response);
                this.setState({
                    isProperInfo: true
                })
            })
            .catch((error) => { console.log(error) });
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

    onSetDescription(e) {
        this.setState({
            description: e.target.value // target is textbox
        });
    }


    render() {


        if (this.state.isProperInfo) {
            return <Redirect to='/mainscreen' />;
        }

        return (
            <Container className="App" style={{paddingBottom:'30px'}}>
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
                                style={{marginBottom:'10px'}}
                            />
                            {this.state.loading ? (
                                <h3>Loading...</h3>
                            ) : (
                                    <img src={this.state.image}  style={{ width: '300px' }} />
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
                    <Button className='btn-danger' style={{color:'white', width:'100px'}}>Post</Button>
                </Form>
            </Container>
        );
    }
}
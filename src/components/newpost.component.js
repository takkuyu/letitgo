import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
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
            image: '',
            loading: false,
            description: '',
            isProperInfo: false,
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onSetTitle = this.onSetTitle.bind(this);
        this.onSetDescription = this.onSetDescription.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
    }

    // componentDidMount() {
    //     console.log(this.props)
    // }

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
            title: this.state.title,
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
            <Container className="App">
                <Navbar />
                <h2>New Post</h2>
                <Form className="form" onSubmit={this.onSubmit}>
                    <Col>
                        <FormGroup>
                            <Label>Title</Label>
                            <Input
                                type="text"
                                name="text"
                                id="exampleImage"
                                placeholder="Enter a title"
                                onChange={this.onSetTitle}
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
                            />
                            {this.state.loading ? (
                                <h3>Loading...</h3>
                            ) : (
                                    <img src={this.state.image} style={{ width: '300px' }} />
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
                                placeholder="description"
                                onChange={this.onSetDescription}
                                style={{
                                    height: '200px',
                                }}
                            />
                        </FormGroup>
                    </Col>
                    <Button >Post</Button>
                </Form>
            </Container>
        );
    }
}
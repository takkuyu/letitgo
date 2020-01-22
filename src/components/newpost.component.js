import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button,
} from 'reactstrap';
// import ImageUploader from 'react-images-upload';
import Navbar from "./navbar.component";

let createObjectURL = (window.URL || window.webkitURL).createObjectURL || window.createObjectURL;


export default class NewPost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            image: '',
            description: '',
            isProperInfo: false,
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onSetTitle = this.onSetTitle.bind(this);
        // this.onSetImage = this.onSetImage.bind(this);
        this.onSetDescription = this.onSetDescription.bind(this);
        this.handleChangeFile = this.handleChangeFile.bind(this);

    }

    componentDidMount(){
        console.log(this.props)
    }



    handleChangeFile(e) {
        let files = e.target.files;
        let image_url = files.length === 0 ? "" : createObjectURL(files[0]);
        this.setState({ image: image_url });
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

    // onSetImage(e) {
    //     this.setState({
    //         image: e.target.value
    //     });
    // }

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
                            <div>
                                <input type="file" ref="file" onChange={this.handleChangeFile} />
                                <img src={this.state.image} width='30%' />
                            </div>
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
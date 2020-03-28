import React, { Component } from 'react';
import axios from 'axios';
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button,
} from 'reactstrap';
import Navbar from "./navbar.component";


export default class EditPosting extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            image: '',
            location: '',
            price: 0,
            condition: '',
            description: '',
            loading: false,
        }
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeLocation = this.onChangeLocation.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeCondition = this.onChangeCondition.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
    }

    componentDidMount() {

        axios.get('http://localhost:3000/postings/' + this.props.match.params.id, { headers: {"Authorization" : `Bearer ${sessionStorage.getItem('token')}`} })
            .then(response => {
                this.setState({
                    title: response.data.posting.title,
                    location: response.data.posting.location,
                    price: response.data.posting.price,
                    condition: response.data.posting.condition,
                    image: response.data.posting.image,
                    description: response.data.posting.description,
                })
            })
            .catch((error) => {
                console.log(error);
            })
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

    onChangeTitle(e) {
        this.setState({
            title: e.target.value 
        });
    }
    onChangeDescription(e) {
        this.setState({
            description: e.target.value 
        });
    }

    onChangeCondition(e) {
        this.setState({
            condition: e.target.value
        });
    }

    onChangeLocation(e) {
        this.setState({
            location: e.target.value
        });
    }

    onChangePrice(e) {
        this.setState({
            price: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const posting = {
            title: this.state.title,
            location: this.state.location,
            price: this.state.price,
            condition: this.state.condition,
            image: this.state.image,
            description: this.state.description,
        }
        axios.post('http://localhost:3000/postings/update/' + this.props.match.params.id, posting, { headers: {"Authorization" : `Bearer ${sessionStorage.getItem('token')}`} })
            .then(res => console.log(res.data))
            .catch(()=>{
                alert('Oops, please sign in again for better security');
                window.location = '/';
                return
            });

        window.location = '/mainscreen';
    }

    render() {
        return (
            <Container className="App" style={{ paddingBottom: '30px' }}>
                <Navbar />
                <h2>Edit Post</h2>
                <Form className="form" onSubmit={this.onSubmit}>
                    <Col>
                        <FormGroup>
                            <Label>Title</Label>
                            <Input
                                type="text"
                                name="text"
                                value={this.state.title}
                                id="exampleImage"
                                onChange={this.onChangeTitle}
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label>Price</Label>
                            <Input
                                type="number"
                                name="price"
                                value={this.state.price}
                                id="price"
                                placeholder="Enter a price"
                                onChange={this.onChangePrice}
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="select">Condition</Label>
                            <Input type="select" name="select" id="select" onChange={this.onChangeCondition} defaultValue={this.state.condition}>
                                <option value={this.state.condition} disabled>{this.state.condition}</option>
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
                                value={this.state.location}
                                id="location"
                                placeholder="Enter a location"
                                onChange={this.onChangeLocation}
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
                                    <img src={this.state.image} alt="#" style={{ width: '300px' }} />
                                )}
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label>Description</Label>
                            <Input
                                type="textarea"
                                name="testarea"
                                value={this.state.description}
                                id="Description"
                                onChange={this.onChangeDescription}
                                style={{
                                    height: '200px',
                                }}
                            />
                        </FormGroup>
                    </Col>
                    <Button style={{ width: '100px' }}>Edit</Button>
                </Form>
            </Container>
        );
    }
}
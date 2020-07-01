import React, { Component } from 'react';
import axios from 'axios';
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button,
} from 'reactstrap';
import Navbar from "./header/header.component";
import { connect } from 'react-redux';
import { storeTitle, storeCondition, storeDescription, storeImage, storeLoadning, storeLocation, checkErrorInput, storePrice } from '../redux/inputs/inputs.actions';

const mapStateToProps = (state) => {
    return {
        title: state.inputs.title,
        location: state.inputs.location,
        price: state.inputs.price,
        image: state.inputs.image,
        condition: state.inputs.condition,
        description: state.inputs.description,
        loading: state.inputs.loading,
        errorInputs: state.inputs.errorInputs,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        storeTitle: (value) => dispatch(storeTitle(value)),
        storeCondition: (value) => dispatch(storeCondition(value)),
        storeImage: (value) => dispatch(storeImage(value)),
        storeDescription: (value) => dispatch(storeDescription(value)),
        storeLoadning: (value) => dispatch(storeLoadning(value)),
        storeLocation: (value) => dispatch(storeLocation(value)),
        checkErrorInput: (value) => dispatch(checkErrorInput(value)),
        storePrice: (value) => dispatch(storePrice(value)),
    }
}

class NewPost extends Component {

    constructor(props) {
        super(props);
        // this.state = {
        //     title: '',
        //     location: '',
        //     price: 0,
        //     image: '',
        //     condition: '',
        //     description: '',
        //     loading: false,
        //     errorInputs: false,
        // }
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

        this.props.storeLoadning(true);

        const res = await fetch(
            'https://api.cloudinary.com/v1_1/dh1mwdsag/image/upload',
            {
                method: 'POST',
                body: data
            }
        )
        const file = await res.json()

        this.props.storeImage(file.secure_url);
        this.props.storeLoadning(false);
    }

    onSubmit(e) {
        e.preventDefault();

        const posting = {
            title: this.props.title,
            location: this.props.location,
            price: this.props.price,
            condition: this.props.condition.toLowerCase(),//@todo : check if this works
            image: this.props.image,
            description: this.props.description,
        }

        axios.post('http://localhost:3000/postings/post', posting, { headers: { "Authorization": `Bearer ${sessionStorage.getItem('token')}` } })
            .then(() => {
                window.location = '/mainscreen';
            })
            .catch(err => {
                if (err.response.status === 400) {
                    this.props.checkErrorInput(true);
                } else if (err.response.status === 403) { // When the token is invalid or does not exist
                    window.location = '/';
                }
            });
    }

    onSetTitle(e) {
        this.props.storeTitle(e.target.value);
    }

    onSetLocation(e) {
        this.props.storeLocation(e.target.value);
    }

    onSetPrice(e) {
        this.props.storePrice(e.target.value);
    }

    onSetCondition(e) {
        this.props.storeCondition(e.target.value);
    }

    onSetDescription(e) {
        this.props.storeDescription(e.target.value);
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
                            {this.props.loading ? (
                                <h3>Loading...</h3>
                            ) : (
                                    <img src={this.props.image} alt="" style={{ width: '300px' }} />
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
                        this.props.errorInputs ?
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


export default connect(mapStateToProps, mapDispatchToProps)(NewPost);
import React, { Component } from 'react';
import axios from 'axios';
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button,
} from 'reactstrap';
import { connect } from 'react-redux';
import { storeTitle, storeCondition, storeDescription, storeImage, storeLoadning, storeLocation, requestInputs, storePrice } from '../redux/inputs/inputs.actions';


const mapStateToProps = (state) => {
    return {
        title: state.inputs.title,
        location: state.inputs.location,
        price: state.inputs.price,
        image: state.inputs.image,
        condition: state.inputs.condition,
        description: state.inputs.description,
        loading: state.inputs.loading,
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
        storePrice: (value) => dispatch(storePrice(value)),
        requestInputs: (value) => dispatch(requestInputs(value)),
    }
}

class EditPosting extends Component {

    constructor(props) {
        super(props);
        // this.state = {
        //     title: '',
        //     image: '',
        //     location: '',
        //     price: 0,
        //     condition: '',
        //     description: '',
        //     loading: false,
        // }
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeLocation = this.onChangeLocation.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeCondition = this.onChangeCondition.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
    }

    componentDidMount() {
        this.props.requestInputs(this.props.match.params.id)
        // axios.get('http://localhost:3000/postings/' + this.props.match.params.id, { headers: {"Authorization" : `Bearer ${sessionStorage.getItem('token')}`} })
        //     .then(response => {
        //         this.setState({
        //             title: response.data.posting.title,
        //             location: response.data.posting.location,
        //             price: response.data.posting.price,
        //             condition: response.data.posting.condition,
        //             image: response.data.posting.image,
        //             description: response.data.posting.description,
        //         })
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     })
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
        const file = await res.json();

        this.props.storeImage(file.secure_url);
        this.props.storeLoadning(false);
    }

    onChangeTitle(e) {
        this.props.storeTitle(e.target.value);
    }
    onChangeDescription(e) {
        this.props.storeDescription(e.target.value);
    }

    onChangeCondition(e) {
        this.props.storeCondition(e.target.value);
    }

    onChangeLocation(e) {
        this.props.storeLocation(e.target.value);
    }

    onChangePrice(e) {
        this.props.storePrice(e.target.value);
    }

    onSubmit(e) {
        e.preventDefault();
        const posting = {
            title: this.props.title,
            location: this.props.location,
            price: this.props.price,
            condition: this.props.condition,
            image: this.props.image,
            description: this.props.description,
        }
        axios.post('http://localhost:3000/postings/update/' + this.props.match.params.id, posting, { headers: { "Authorization": `Bearer ${sessionStorage.getItem('token')}` } })
            .then(() => window.location = '/mainscreen')
            .catch((err) => {
                if (err.response.status === 403) {
                    window.location = '/';
                } else {
                    console.log(err)
                }
            });
    }

    render() {
        return (
            <Container className="App" style={{ paddingBottom: '30px' }}>

                <h2>Edit Post</h2>
                <Form className="form" onSubmit={this.onSubmit}>
                    <Col>
                        <FormGroup>
                            <Label>Title</Label>
                            <Input
                                type="text"
                                name="text"
                                value={this.props.title}
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
                                value={this.props.price}
                                id="price"
                                placeholder="Enter a price"
                                onChange={this.onChangePrice}
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="select">Condition</Label>
                            <Input type="select" name="select" id="select" onChange={this.onChangeCondition} defaultValue={this.props.condition}>
                                <option value={this.props.condition} disabled>{this.props.condition}</option>
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
                                value={this.props.location}
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
                            {this.props.loading ? (
                                <h3>Loading...</h3>
                            ) : (
                                    <img src={this.props.image} alt="#" style={{ width: '300px' }} />
                                )}
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label>Description</Label>
                            <Input
                                type="textarea"
                                name="testarea"
                                value={this.props.description}
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

export default connect(mapStateToProps, mapDispatchToProps)(EditPosting);
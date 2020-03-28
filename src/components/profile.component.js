import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Navbar from "./navbar.component";
import Footer from "./footer.component";
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button,
} from 'reactstrap';
import '../styles/profile.css'

export default class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {},
            isClicked: false,
            newName: '',
            newEmail: '',
            newPic: '',
            loading: false,
            createdDay:''
        }

        this.setProfile = this.setProfile.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.uploadImage = this.uploadImage.bind(this);

    }

    componentDidMount() {
         axios.get('http://localhost:3000/users/authenticate', { headers: {"Authorization" : `Bearer ${sessionStorage.getItem('token')}`} })
            .then((res) => {
                this.setState({
                    user: res.data,
                    newName: res.data.username,
                    newEmail: res.data.email,
                    newPic: res.data.picture,
                    createdDay: String(new Date(res.data.createdAt)).substring(0,15)
                })
            })
            .catch(()=> window.location = '/')
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
            newPic: file.secure_url
        })
        this.setState({
            loading: false
        })
    }

    setProfile(e) {

        e.preventDefault();
        const newUserInfo = {
            newName: this.state.newName,
            newEmail: this.state.newEmail,
            newPic: this.state.newPic,
        }
        axios.post('http://localhost:3000/users/update', newUserInfo, { headers: {"Authorization" : `Bearer ${sessionStorage.getItem('token')}`} })
            .then(console.log)
            .catch(console.log);

        window.location = '/profile';

    }

    onChangeUsername(e) {
        this.setState({
            newName: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            newEmail: e.target.value
        });
    }


    render() {



        return (
            <div>
                <Navbar />
                <div className="App profile-container">
                    {!this.state.isClicked ?
                        <div className="maincontent" >
                            <div className="bg-image" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${this.state.user.picture})` }}></div>
                            <img src={this.state.user.picture} alt='' />
                            <div className="userinfo">
                                <p className="username">{this.state.user.username}</p>
                                <p className="user-email">Email: <span>{this.state.user.email}</span> | Joined on: <span>{this.state.createdDay}</span></p>
                                {/* <p className="user-email">{this.state.user.createdAt}</p> */}
                                <button onClick={() => this.setState({ isClicked: true })}>EDIT YOUR PROFILE</button>
                            </div>
                        </div>
                        :
                        <Container className="edit-container">
                            <h2>Update Profile</h2>
                            <Form className="form" onSubmit={this.setProfile}>
                                <Col>
                                    <FormGroup>
                                        <Label>Username</Label>
                                        <Input
                                            type="text"
                                            name="text"
                                            value={this.state.newName}
                                            id="exampleImage"
                                            placeholder="Enter a new username"
                                            onChange={this.onChangeUsername}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Label>Email</Label>
                                        <Input
                                            type="email"
                                            name="email"
                                            value={this.state.newEmail}
                                            id="email"
                                            placeholder="Enter a new email"
                                            onChange={this.onChangeEmail}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Label>Profile Picture</Label>
                                        <Input
                                            type="file"
                                            name="file"
                                            placeholder="Upload an image"
                                            onChange={this.uploadImage}
                                            style={{ marginBottom: '10px' }}
                                        />
                                        {this.state.loading ? (
                                            <h3 style={{ height: '180px' }}>Loading...</h3>
                                        ) : (
                                                <img className="profile-image" src={this.state.newPic} alt="" />
                                            )}
                                    </FormGroup>
                                </Col>
                                <Button style={{ width: '100px', marginRight:'70px', backgroundColor:'green !important' }}>Update</Button>
                                <Button id="cancel-btn" onClick={() => { this.setState({ isClicked: false }) }}>Cancel</Button>
                            </Form>
                        </Container>
                    }
                </div>
                <Footer />
            </div >
        );
    }
}



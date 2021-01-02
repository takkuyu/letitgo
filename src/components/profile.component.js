import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './header/header.component';
import Footer from './footer/footer.component';
import {
  Container,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from 'reactstrap';
import { connect } from 'react-redux';
const Profile = () => {

  // componentDidMount() {
  //   this.props.requestUser();
  // }

  // uploadImage = async (e) => {
  //   const files = e.target.files;
  //   const data = new FormData();
  //   data.append('file', files[0]);
  //   data.append('upload_preset', 'myreactapp');

  //   this.props.storeLoadning(true);
  //   const res = await fetch(
  //     'https://api.cloudinary.com/v1_1/dh1mwdsag/image/upload',
  //     {
  //       method: 'POST',
  //       body: data,
  //     }
  //   );
  //   const file = await res.json();

  //   this.props.storeNewUserPic(file.secure_url);
  //   this.props.storeLoadning(false);
  // };

  // setProfile(e) {
  //   e.preventDefault();
  //   const newUserInfo = {
  //     newName: this.props.new_username,
  //     newEmail: this.props.new_user_email,
  //     newPic: this.props.new_user_picture,
  //   };
  //   axios
  //     .post('http://localhost:3000/users/update', newUserInfo, {
  //       headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
  //     })
  //     .then(console.log)
  //     .catch(console.log);
  //   window.location = '/profile';
  // }

  // onChangeUsername(e) {
  //   this.props.storeNewUsername(e.target.value);
  // }

  // onChangeEmail(e) {
  //   this.props.storeNewUserEmail(e.target.value);
  // }

  return (
    <div>
      <div className="App profile-container">
        {/* {!this.state.isClicked ? (
            <div className="maincontent">
              <div
                className="bg-image"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${this.props.this_user_picture})`,
                }}
              ></div>
              <img src={this.props.this_user_picture} alt="" />
              <div className="userinfo">
                <p className="username">{this.props.this_username}</p>
                <p className="user-email">
                  Email: <span>{this.props.this_user_email}</span> | Joined on:{' '}
                  <span>{this.props.createdAt}</span>
                </p>
                <button onClick={() => this.setState({ isClicked: true })}>
                  EDIT YOUR PROFILE
                </button>
              </div>
            </div>
          ) : (
            <Container className="edit-container">
              <h2>Update Profile</h2>
              <Form className="form" onSubmit={this.setProfile}>
                <Col>
                  <FormGroup>
                    <Label>Username</Label>
                    <Input
                      type="text"
                      name="text"
                      value={this.props.new_username}
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
                      value={this.props.new_user_email}
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
                    {this.props.loading ? (
                      <h3 style={{ height: '180px' }}>Loading...</h3>
                    ) : (
                      <img
                        className="profile-image"
                        src={this.props.new_user_picture}
                        alt=""
                      />
                    )}
                  </FormGroup>
                </Col>
                <Button
                  style={{
                    width: '100px',
                    marginRight: '70px',
                    backgroundColor: 'green !important',
                  }}
                >
                  Update
                </Button>
                <Button
                  id="cancel-btn"
                  onClick={() => {
                    this.setState({ isClicked: false });
                  }}
                >
                  Cancel
                </Button>
              </Form>
            </Container>
          )} */}
      </div>
    </div>
  );
}

export default Profile;

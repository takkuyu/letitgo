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
import {
  requestUser,
  storeNewUsername,
  storeNewUserEmail,
  storeNewUserPic,
} from '../redux/user/user.actions';
import { storeLoadning } from '../redux/inputs/inputs.actions';

const mapStateToProps = (state) => {
  return {
    this_username: state.user.this_username,
    this_user_email: state.user.this_user_email,
    this_user_picture: state.user.this_user_picture,
    new_username: state.user.new_username,
    new_user_email: state.user.new_user_email,
    new_user_picture: state.user.new_user_picture,
    createdAt: state.user.createdAt,
    loading: state.inputs.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    requestUser: () => dispatch(requestUser()),
    storeNewUsername: (value) => dispatch(storeNewUsername(value)),
    storeNewUserEmail: (value) => dispatch(storeNewUserEmail(value)),
    storeNewUserPic: (value) => dispatch(storeNewUserPic(value)),
    storeLoadning: (value) => dispatch(storeLoadning(value)),
  };
};
class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isClicked: false,
      // user: {},
      // newName: '',
      // newEmail: '',
      // newPic: '',
      // loading: false,
      // createdDay: ''
    };
    this.setProfile = this.setProfile.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
  }

  componentDidMount() {
    this.props.requestUser();
  }

  uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'myreactapp');

    this.props.storeLoadning(true);
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/dh1mwdsag/image/upload',
      {
        method: 'POST',
        body: data,
      }
    );
    const file = await res.json();

    this.props.storeNewUserPic(file.secure_url);
    this.props.storeLoadning(false);
  };

  setProfile(e) {
    e.preventDefault();
    const newUserInfo = {
      newName: this.props.new_username,
      newEmail: this.props.new_user_email,
      newPic: this.props.new_user_picture,
    };
    axios
      .post('http://localhost:3000/users/update', newUserInfo, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
      })
      .then(console.log)
      .catch(console.log);
    window.location = '/profile';
  }

  onChangeUsername(e) {
    this.props.storeNewUsername(e.target.value);
  }

  onChangeEmail(e) {
    this.props.storeNewUserEmail(e.target.value);
  }

  render() {
    return (
      <div>
        <div className="App profile-container">
          {!this.state.isClicked ? (
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
                {/* <p className="user-email">{this.state.user.createdAt}</p> */}
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
          )}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

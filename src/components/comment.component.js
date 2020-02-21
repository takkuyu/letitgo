import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
    Container, ListGroup, ListGroupItem, Input, Button, Form
} from 'reactstrap';
import Navbar from "./navbar.component";
import "../styles/comment.css"


export default class Comment extends Component {

    constructor(props) {
        super(props);

        this.state = {
            posting: [],
            comment: '',
            comments: [],
            liked: false,
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onSetComment = this.onSetComment.bind(this);
        this.getComments = this.getComments.bind(this);
        this.getLikes = this.getLikes.bind(this);
        this.postLikes = this.postLikes.bind(this);
        this.isLikedAlready = this.isLikedAlready.bind(this);
    }

    componentDidMount() {

        if (this.props.location.id === undefined) {
            this.setState({
                posting: JSON.parse(sessionStorage.getItem('posting')),
                comments: JSON.parse(sessionStorage.getItem('comments')),
            })
            this.isLikedAlready(JSON.parse(sessionStorage.getItem('posting'))._id);
            return;
        }

        axios.get("http://localhost:3000/postings/" + this.props.location.id)
            .then(res => {
                this.setState({
                    posting: res.data,
                    comments: res.data.comments,
                })
            })
        this.isLikedAlready(this.props.location.id);
    }

    isLikedAlready(id) {
        const log = {
            likedId: id
        }
        axios.post('http://localhost:3000/likes/isLiked', log)
            .then(res => {
                if (res.data !== null) {
                    this.setState({
                        liked: true
                    })
                    return;
                }
            })
    }

    componentDidUpdate() {
        sessionStorage.setItem('posting', JSON.stringify(this.state.posting));
        sessionStorage.setItem('comments', JSON.stringify(this.state.comments));
    }

    getComments() {
        return this.state.comments.map(com => {
            return (
                <ListGroupItem key={new Date().getTime().toString(36) + '-' + Math.random().toString(36)} style={{ border: 'none', borderBottom: '1px solid', borderRadius: '0', fontWeight: 'bold', color: 'black' }}>
                    <span style={{ fontSize: '10px', color: '#44a038' }}>{com.author}</span> - {com.comment}
                </ListGroupItem>
            );
        });
    }

    onSubmit(e) {
        e.preventDefault();

        if (this.state.comment === '') {
            return;
        }

        const comment = {
            author: 'Test User', // since I haven't implemented user authentication yet, set this 'test user' for this version
            comment: this.state.comment
        }

        axios.post('http://localhost:3000/postings/update/comments/' + this.state.posting._id, comment)
            .then(() => {
                axios.get('http://localhost:3000/postings/' + this.state.posting._id)
                    .then(response => {
                        this.setState({
                            comments: response.data.comments,
                            comment: ''
                        })
                    })
                    .catch((error) => { console.log(error) });
            })
            .catch((error) => { console.log(error) })

    }

    onSetComment(e) {
        this.setState({
            comment: e.target.value
        });
    }

    postLikes(data) {
        const like = {
            likedId: data._id,
            title: data.title,
            location: data.location,
            price: data.price,
            image: data.image,
        }

        axios.post('http://localhost:3000/likes/post', like)
            .then(response => {
                console.log(response);
            })
            .catch((error) => { console.log(error) });
    }


    getLikes(id) {
        axios.get('http://localhost:3000/postings/' + id)
            .then(response => {
                this.setState({
                    liked: true,
                })
                this.postLikes(response.data);
            })
            .catch((error) => { console.log(error) });
    }

    render() {
        const date = new Date(this.state.posting.createdAt);
        const createdDay = String(date).substring(0,15);

        return (
            <Container>
                <Navbar />
                <div className="product_details">
                    <div className="container">
                        <div className="row details_row">
                            <div className="col-lg-6">
                                <div className="details_image">
                                    <div className="details_image_large" style={{ marginBottom: '20px' }}><img src={this.state.posting.image} alt="" /></div>
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="details_content">
                                    <div className="details_name">{this.state.posting.title}</div>
                                    <div className="details_price">${this.state.posting.price}</div>

                                    <div className="location_container">
                                        <div className="location">Location:</div>
                                        <span>{this.state.posting.location}</span>
                                        <br/>
                                        <div className="location" style={{marginTop:'15px'}}>Posted on:</div>
                                        <span>{createdDay}</span>
                                        <br/>
                                        <div className="location" style={{marginTop:'15px'}}>Condition:</div>
                                        <span>{this.state.posting.condition}</span>
                                    </div>
                                    <div className="details_text">
                                        <h4>Description</h4>
                                        <p>{this.state.posting.description}</p>
                                    </div>

                                    <div>
                                        {
                                            this.state.posting.createdby === 'Test User' ?
                                                (<div style={{ marginTop: '12px' }}>
                                                    <p className='posted-date'>You posted this item on: <span>{createdDay}</span></p>
                                                    <div className="button favorite_button" style={{ marginTop: '0px' }}><Link to={"/update/" + this.state.posting._id}>Edit</Link></div>
                                                </div>
                                                )
                                                :
                                                this.state.liked ?
                                                    <div className="button favorite_button" style={{ cursor: 'default' }}><button style={{ backgroundColor: 'black', color: '#fff', cursor: 'default' }}>Added</button></div>
                                                    :
                                                    <div className="button favorite_button" onClick={() => this.getLikes(this.state.posting._id)}><button>Add to Favorite</button></div>
                                        }

                                    </div>

                                    <div className="details_share">
                                        <span>Share:</span>
                                        <ul>
                                            <li><a title="pinterest" target="_blank" rel="noreferrer noopener" href="https://www.pinterest.com/"> <i className="fab fa-pinterest" aria-hidden="true"/></a></li>
                                            <li><a title="instagram" target="_blank" rel="noreferrer noopener" href="https://www.instagram.com/"> <i className="fab fa-instagram" aria-hidden="true"/></a></li>
                                            <li><a href="https://www.facebook.com/" rel="noreferrer noopener" target="_blank" title="Facebook"> <i className="fab fa-facebook" aria-hidden="true"/></a></li>
                                            <li><a href="https://twitter.com" rel="noreferrer noopener" target="_blank" title="Twitter"> <i className="fab fa-twitter" aria-hidden="true"/></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row comment_row">
                            <div className="col">
                                <div className="comment_title_container">
                                    <div className="comment_title">Comments<span>({this.state.comments.length})</span></div>
                                </div>
                                <ListGroup id='comment-frame' style={{ overflow: 'scroll', maxHeight: "400px", height: "400px", border: "1px solid black" }}>
                                    {this.getComments()}
                                </ListGroup>
                                <Form className="form" onSubmit={this.onSubmit} style={{ paddingBottom: '100px' }}>
                                    <Input
                                        type="text"
                                        name="text"
                                        id="comment"
                                        value={this.state.comment}
                                        placeholder="Enter a comment"
                                        onChange={this.onSetComment}
                                    />
                                    <div className='button-container'>
                                        <Button>Comment</Button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div >
            </Container>
        );
    }
};

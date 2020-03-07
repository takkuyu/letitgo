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
            username: '',
            exist: true, // check if the post still exist. if it's deleted it gets false,
            nameArray: []
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onSetComment = this.onSetComment.bind(this);
        this.getComments = this.getComments.bind(this);
        this.getLiked = this.getLiked.bind(this);
        this.isLikedAlready = this.isLikedAlready.bind(this);
        this.getAuthorById = this.getAuthorById.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        axios.get("http://localhost:3000/postings/comments/" + this.props.match.params.id)
            .then(res => {
                this.setState({
                    posting: res.data,
                    comments: res.data.comments,
                })
                this.isLikedAlready(this.props.match.params.id);
                this.getAuthorById(res.data.comments);
            })
            .catch(() => {
                this.setState({
                    exist: false
                })
                return
            })
            .then(() => {
                axios.get('http://localhost:3000/users/' + JSON.parse(sessionStorage.getItem('userid')))
                    .then(response => {
                        this.setState({
                            username: response.data.username
                        })
                    })
                    .catch(console.log);
            })
            .catch(console.log)
    }

    isLikedAlready(id) {
        const userId = {
            userId: JSON.parse(sessionStorage.getItem('userid'))
        }
        axios.post('http://localhost:3000/users/checkLiked/' + id, userId)
            .then(res => {
                if (res.data) {
                    this.setState({
                        liked: true
                    })
                }
            })
    }

    componentDidUpdate() {
        sessionStorage.setItem('posting', JSON.stringify(this.state.posting));
        sessionStorage.setItem('comments', JSON.stringify(this.state.comments));
    }

    getComments(nameArray) {
        let i = 0;
        return this.state.comments.map(com => {

            if(nameArray[i] === this.state.username){
                return (
                    <ListGroupItem  key={new Date().getTime().toString(36) + '-' + Math.random().toString(36)} 
                    style={{ border: 'none', borderBottom: 'rgba(0,0,0,0.4) 1px solid', borderRadius: '0', fontWeight: 'bold', color: 'black',textAlign:'right', padding:'5px 20px' }}>
                        <p style={{ fontSize: '15px', fontWeight:'bold', color:'#ff0000', paddingBottom:'3px', lineHeight:'15px'}}>{nameArray[i++]}</p >
                        {com.comment}
                    </ListGroupItem>
                );
            }else{
                return (
                    <ListGroupItem key={new Date().getTime().toString(36) + '-' + Math.random().toString(36)} 
                    style={{ border: 'none', borderBottom: 'rgba(0,0,0,0.4) 1px solid', borderRadius: '0', fontWeight: 'bold', color: 'black', padding:'5px 20px' }}>
                       <p style={{ fontSize: '15px', fontWeight:'bold', color:'#44a038', paddingBottom:'3px', lineHeight:'15px'}}>{nameArray[i++]}</p>
                       {com.comment}
                    </ListGroupItem>
                );
            }
        });
    }

    async getAuthorById(comments) {
        try{
        const nameArray = await Promise.all(comments.map(comment => axios.get('http://localhost:3000/users/' + comment.author).then(resp => resp.data.username)))        // const name = await res.then((response) => response.data.username)
        this.setState({
            nameArray: nameArray
        });
        } catch(err){
            console.log(err)
        }
    }

    onSubmit(e) {
        e.preventDefault();

        if (this.state.comment === '') {
            return;
        }

        const comment = {
            author: JSON.parse(sessionStorage.getItem('userid')),
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
                        this.getAuthorById(response.data.comments);
                        // window.location.reload();
                    })
                    .catch(console.log);
            })
            .catch(console.log)
    }

    onSetComment(e) {
        this.setState({
            comment: e.target.value
        });
    }

    getLiked(id) {

        const favoriteId = {
            favoriteId: id
        }

        axios.post('http://localhost:3000/users/favorite/' + JSON.parse(sessionStorage.getItem('userid')), favoriteId)
            .then(response => {
                console.log(response);
                this.setState({
                    liked: true
                })
            })
            .catch(console.log);
    }

    render() {
        const date = new Date(this.state.posting.createdAt);
        const createdDay = String(date).substring(0, 15);
        return (
            <Container>
                <Navbar />
                {
                    this.state.exist ?
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
                                                <br />
                                                <div className="location" style={{ marginTop: '15px' }}>Posted on:</div>
                                                <span>{createdDay}</span>
                                                <br />
                                                <div className="location" style={{ marginTop: '15px' }}>Condition:</div>
                                                <span>{this.state.posting.condition}</span>
                                            </div>
                                            <div className="details_text">
                                                <h4>Description</h4>
                                                <p>{this.state.posting.description}</p>
                                            </div>

                                            <div>
                                                {
                                                    this.state.posting.createdby === JSON.parse(sessionStorage.getItem('userid')) ?
                                                        (<div style={{ marginTop: '12px' }}>
                                                            <p className='posted-date'>You posted this item on: <span>{createdDay}</span></p>
                                                            <div className="button favorite_button" style={{ marginTop: '0px' }}><Link to={"/update/" + this.state.posting._id}>Edit</Link></div>
                                                        </div>
                                                        )
                                                        :
                                                        this.state.liked ?
                                                            <div className="button favorite_button" style={{ cursor: 'default' }}><button style={{ backgroundColor: 'black', color: '#fff', cursor: 'default' }}>Added</button></div>
                                                            :
                                                            <div className="button favorite_button" onClick={() => this.getLiked(this.state.posting._id)}><button>Add to Favorite</button></div>
                                                }

                                            </div>

                                            <div className="details_share">
                                                <span>Share:</span>
                                                <ul>
                                                    <li><a title="pinterest" target="_blank" rel="noreferrer noopener" href="https://www.pinterest.com/"> <i className="fab fa-pinterest" aria-hidden="true" /></a></li>
                                                    <li><a title="instagram" target="_blank" rel="noreferrer noopener" href="https://www.instagram.com/"> <i className="fab fa-instagram" aria-hidden="true" /></a></li>
                                                    <li><a href="https://www.facebook.com/" rel="noreferrer noopener" target="_blank" title="Facebook"> <i className="fab fa-facebook" aria-hidden="true" /></a></li>
                                                    <li><a href="https://twitter.com" rel="noreferrer noopener" target="_blank" title="Twitter"> <i className="fab fa-twitter" aria-hidden="true" /></a></li>
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
                                        <ListGroup id='comment-frame' style={{ overflow: 'scroll', maxHeight: "500px", height: "500px", border: "2px solid black" }}>
                                            {this.getComments(this.state.nameArray)}
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
                        :
                        <div className="notFound-container" style={{ display: 'table', textAlign: 'center', width: '100%', marginTop: '130px', height: 'calc(100vh - 130px)', lineHeight: 'calc(100vh - 130px)', }}>
                            <div style={{ display: 'table-cell', verticalAlign: 'middle' }}>
                                <h2>This item has been deleted !</h2>
                                <h3>Let's find another one <Link to="/mainscreen" style={{ color: '#ff0000' }}>here</Link>!</h3>
                            </div>
                        </div>
                }
            </Container>
        );
    }
};

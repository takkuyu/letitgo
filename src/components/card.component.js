import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
    Col
} from 'reactstrap';
import "../styles/mainscreen.css"
import "../styles/card.css"



export default class CardList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            image: '',
            description: '',
            liked: false
        }
    }


    // state is set after render() (re-rendered), so use didUpdate, otherwise setState isn't applied
    postLikes() {
        const like = {
            title: this.state.title,
            image: this.state.image,
            description: this.state.description,
            liked: !this.state.liked,
        }

        this.setState({
            liked: true
        })

        // console.log('test')
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
                    title: response.data.title,
                    image: response.data.image,
                    description: response.data.description,
                })

                this.postLikes();
            })
            .catch((error) => { console.log(error) });
    }

    render() {
        // console.log(this.state.liked)
        return (
            <Col md={'4'}>
                <div className="product" >
                    <div className="userIcon">
                        <div className="postedby" >Posted by:</div>
                        <span>{this.props.posting.createdby}</span>
                        <img src={this.props.posting.profilePic} alt="" />
                    </div>
                    <div className="product_image">
                        {/* <Link to="/comments">
                            <img src={this.props.posting.image} alt="" />
                        </Link> */}
                        <Link to={{
                            pathname: "/comments",
                            id: this.props.posting._id,
                            user: this.props.loginedUser
                        }}>
                            <img src={this.props.posting.image} alt="" />
                        </Link>
                    </div>
                    <div className="product_content">
                        <div className="product_title">{this.props.posting.title}</div>
                        <div className="product_price">${this.props.posting.price}</div>
                        {
                            this.props.posting.createdby === this.props.loginedUser ?
                                <div>
                                    <Link to={"/update/" + this.props.posting._id} style={{ float: 'left', paddingLeft:'30px', color:"#44a038" }}>Edit</Link>
                                    <a style={{ cursor: 'pointer', color: "red", float:'right',paddingRight:'30px' }} onClick={() => { this.props.deletePosting(this.props.posting._id) }}>Delete</a>
                                </div>
                                :
                                <div></div>
                        }
                        {/* // <Link to={"/update/" + this.props.posting._id} style={{ paddingRight: '10px' }}>Edit</Link>
                        // <a style={{ cursor: 'pointer', color: "red" }} onClick={() => { this.props.deletePosting(this.props.posting._id) }}>Delete</a> */}
                        {/* {this.state.liked ?
                            <Button color="secondary" style={{ marginTop: '10px' }}>Likes</Button>
                            :
                            <Button color="danger" onClick={() => this.getLikes(this.props.posting._id)} style={{ display: 'inline-block' }}>Likes</Button>
                        } */}
                    </div>
                </div>
            </Col >
        );
    }
};


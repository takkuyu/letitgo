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
            liked: false,
            username:'',
            userPic:''
        }
    }

    componentDidMount(){
        axios.get("http://localhost:3000/users/" + this.props.posting.createdby)
        .then(res => {
            this.setState({
                username: res.data.username,
                userPic: res.data.picture,
            })
        })
        .catch(console.log)
    }

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

        const date = new Date(this.props.posting.createdAt);
        const createdDay = String(date).substring(0,15);

        return (
            <Col md={'4'}>
                <div className="product" >
                    <div className="userIcon">
                        <div className="postedby" >Posted by:</div>
                        <span>{this.state.username}</span>
                        <img src={this.state.userPic} alt="" />
                    </div>
                    <div className="product_image">
                        <Link to={{
                            pathname: `postings/comments/${this.props.posting._id}`,
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
                            this.state.username === this.props.loginedUser ?
                                <div>
                                    <Link to={"/update/" + this.props.posting._id} style={{ float: 'left', marginLeft: '30px', color: "#44a038" }}>Edit</Link>
                                    <span style={{ cursor: 'pointer', color: "red", float: 'right', marginRight: '30px' }} onClick={() => { this.props.deletePosting(this.props.posting._id) }}>Delete</span>
                                </div>
                                :
                                <div>
                                    <p style={{color:"#44a038", marginTop:'5px'}}>{createdDay}</p>
                                </div>
                        }
                    </div>
                </div>
            </Col >
        );
    }
};


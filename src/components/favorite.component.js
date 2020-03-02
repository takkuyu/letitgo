import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
    Container, Col, Row
} from 'reactstrap';
import Navbar from "./navbar.component";
import Footer from "./footer.component";


const FavoriteList = props => (
    <Col md={'4'}>
        <div className="product">
            <div className="favorite_container">
                <p className="posted-date" >Added on:<span>{props.createdDay}</span></p>
            </div>
            <div className="product_image">
                <Link to={{
                    pathname: `/postings/comments/${props.like._id}`,
                    // id: props.like.likedId
                }}>
                    <img src={props.like.image} alt="" />
                </Link>
            </div>
            <div className="product_content">
                <div className="product_title">{props.like.title}</div>
                <div className="product_price">${props.like.price}</div>
                <div className="location_container" style={{ marginTop: '10px' }}>
                    <div className='location'>Location:</div>
                    <span>{props.like.location}</span>
                </div>
                <span style={{ cursor: 'pointer', color: "red" }} onClick={() => props.deleteLike(props.like._id)}>Unlike</span>
            </div>
        </div>
    </Col >
);


export default class Favorite extends Component {

    constructor(props) {
        super(props);

        this.state = {
            likes: [],
        }
        this.deleteLike = this.deleteLike.bind(this);
        this.postingList = this.postingList.bind(this);
        this.getLikesById = this.getLikesById.bind(this);
    }

    componentDidMount() {

        axios.get('http://localhost:3000/users/' + this.props.match.params.id)
            .then((res) => {
                const favorites = res.data.favorites;
                this.getLikesById(favorites)
            })
            .catch(console.log)
    }

    async getLikesById(favorites) {
        const res = await Promise.all(favorites.map(favorite => axios.get('http://localhost:3000/postings/' + favorite).then(resp => resp.data)))
        this.setState({
            likes: res
        })
    }

    deleteLike(id) {
        const deleteId = {
            deleteId:id
        }

        axios.post('http://localhost:3000/users/deleteLike/' + this.props.match.params.id, deleteId)
            .then(response => console.log(response.data));

        this.setState({
            likes: this.state.likes.filter(el => el._id !== id) // this filter returns all the elements in the db whose id does not match the deleted id.
        })

    }

    postingList() {
        return this.state.likes.map(like => {
            const date = new Date(like.createdAt);
            const createdDay = String(date).substring(0, 15);

            return (
                <FavoriteList
                    createdDay={createdDay}
                    like={like}
                    key={like._id}
                    deleteLike={this.deleteLike}
                />

            );
        })
    }

    render() {
        return (
            <div>
                <Container className="App">
                    <Navbar />
                    <Row>
                        {!this.state.likes.length ?
                            <div style={{ textAlign: 'center', height: 'calc(100vh - 260px)', width: '100%', lineHeight: 'calc(100vh - 260px)', fontSize: '20px' }}>
                                There are no favorite items added
                            </div>
                            : this.postingList()
                        }
                    </Row>
                </Container>
                <Footer />
            </div >
        );
    }
}
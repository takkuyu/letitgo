import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
    Card, CardText, CardBody, CardLink,
    CardTitle, Col, Button
} from 'reactstrap';



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

        // console.log(prevProps)
        // console.log(this.state.title)

        // if(prevState){
        //     return;
        // }

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
                // response.data.map(data=>{
                //     console.log(data._id)
                // })

                // console.log('getlikes')

                // axios.post('http://localhost:3000/likes/post', response.data._id)
                //     .then(response => {
                //         console.log(response);
                //     })
                //     .catch((error) => { console.log(error) });

                this.postLikes();
            })
            .catch((error) => { console.log(error) });
    }

    render() {
        console.log(this.state.liked)
        return (
            <Col sm="4">
                <Card style={{ marginTop: '20px' }}>
                    <CardBody>
                        <CardTitle style={{ height: '20px' }}>{this.props.posting.title}</CardTitle>
                    </CardBody>
                    <img width="100%" src={this.props.posting.image} alt="Card image cap" />
                    <CardBody>
                        <CardText>{this.props.posting.description}</CardText>
                        {this.state.liked ?
                            <Button color="secondary" style={{ display: 'inline-block' }}>Likes</Button>
                            :
                            <Button color="danger" onClick={() => this.getLikes(this.props.posting._id)} style={{ display: 'inline-block' }}>Likes</Button>
                        }
                        {/* <Button color="danger" onClick={() => this.getLikes(this.props.posting._id)} style={{ display: 'inline-block' }}>Likes</Button> */}
                        <Button color="primary" style={{ display: 'inline-block', marginLeft: '20px' }}>Comments</Button>
                        <Link to={"/update/" + this.props.posting._id} style={{ marginRight: '10' }}>Edit</Link>
                        <CardLink href="#" onClick={() => { this.props.deletePosting(this.props.posting._id) }}>Delete</CardLink>
                    </CardBody>
                </Card>
            </Col>
        );
    }
};


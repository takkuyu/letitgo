import React, { Component } from 'react';
import axios from 'axios';
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button, Row
} from 'reactstrap';
import {
    Card, CardText, CardBody, CardLink,
    CardTitle
} from 'reactstrap';
import Navbar from "./navbar.component";

const FavoriteList = props => (
    <Col sm="4">
        <Card style={{ marginTop: '20px' }}>
            <CardBody>
                <CardTitle style={{ height: '20px' }}>{props.like.title}</CardTitle>
            </CardBody>
            <img width="100%" src={props.like.image} alt="Card image cap" />
            <CardBody>
                <CardText>{props.like.description}</CardText>
                <Button color="danger" onClick={() => props.deleteLike(props.like._id)} style={{ display: 'inline-block' }}>Unlike</Button>
                {/* <CardLink href="#" onClick={() => { this.props.deletePosting(this.props.posting._id) }}>Delete</CardLink> */}
            </CardBody>
        </Card>
    </Col>
);



export default class Favorite extends Component {

    constructor(props) {
        super(props);

        this.state = {
            likes: []
        }
        // console.log(props)
    }

    componentDidMount() {
        axios.get('http://localhost:3000/likes/')
            .then(response => {
                this.setState({
                    likes: response.data,
                })
            })
            .catch((error) => { console.log(error) });
    }

    // componentWillUnmount(){
    //     console.log('unmounted !')
    //     // axios.get('http://localhost:3000/likes/')
    //     // .then(response => {
    //     //     // console.log(response.data.title)
    //     //     response.data.map(like => {
    //     //         console.log(like._id)
    //     //         if(like._id)
    //     //         axios.delete('http://localhost:3000/postings/' + id)
    //     //         .then(res => console.log(res.data));

    //     //     })

    //     // })
    //     // .catch((error) => { console.log(error) });
    // }

    deleteLike(id) {

        console.log(id)
        axios.delete('http://localhost:3000/likes/' + id)
            .then(response => console.log(response.data));

            console.log(this.state)

        // this.setState({
        //     likes: this.state.likes.filter(el => el._id !== id) // this filter returns all the elements in the db whose id does not match the deleted id.
        // })

    }

    postingList() {
        return this.state.likes.map(like => {
            return (

                <FavoriteList
                    like={like}
                    key={like._id}
                    deleteLike={this.deleteLike}
                // deletePosting={this.deletePosting}
                />

            );
        })
    }

    render() {
        return (
            // <Container className="App">
            //     <Navbar/>
            //   {/* <h1>{this.props.location.aboutProps}</h1> */}
            //   <h1>{this.state.id}</h1>
            // </Container>
            <Container className="App">
                <Navbar />
                <Row>
                    {this.postingList()}
                </Row>
            </Container>

            // <Col sm="4">
            //     <Card style={{ marginTop: '20px' }}>
            //         <CardBody>
            //             <CardTitle style={{ height: '20px' }}>{this.props.posting.title}</CardTitle>
            //         </CardBody>
            //         <img width="100%" src={this.props.posting.image} alt="Card image cap" />
            //         <CardBody>
            //             <CardText>{this.props.posting.description}</CardText>
            //             {/* <CardLink href="#" onClick={() => { this.props.deletePosting(this.props.posting._id) }}>Delete</CardLink> */}
            //         </CardBody>
            //     </Card>
            // </Col>
        );
    }
}
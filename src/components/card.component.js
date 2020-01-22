import React from 'react';
import { Link } from 'react-router-dom';
import {
    Card, CardText, CardBody, CardLink,
    CardTitle, Col
} from 'reactstrap';

const CardList = (props) => {
    return (
            <Col sm="4">
                <Card style={{marginTop:'20px'}}>
                    <CardBody>
                        <CardTitle style={{height: '20px'}}>{props.posting.title}</CardTitle>
                    </CardBody>
                    <img width="100%" src={props.posting.image} alt="Card image cap" />
                    <CardBody>
                        <CardText>{props.posting.description}</CardText>
                        <Link to={"/update/" + props.posting._id} style={{marginRight:'10'}}>Edit</Link>
                        <CardLink href="#" onClick={() => { props.deletePosting(props.posting._id) }}>Delete</CardLink>
                    </CardBody>
                </Card>
            </Col>
    );
};

export default CardList;
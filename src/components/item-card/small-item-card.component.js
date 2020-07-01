import React from 'react';
import {
    Col
} from 'reactstrap';

const SmallItemCard = ({ post, md }) => {
    return (
        <Col sm={3} md={md} className="small-item-card">
            <div className="small-item-card__image">
                <img src={post.image} alt="post" />
            </div>
            <p className="small-item-card__title">{post.title}</p>
            <p className="small-item-card__location">{post.location}</p>
            <p className="small-item-card__price"><b>${post.price}</b></p>
        </Col>
    )
}

export default SmallItemCard;

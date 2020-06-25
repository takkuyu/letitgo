import React from 'react';
import {
    Col
} from 'reactstrap';

const SmallItemCard = ({ post }) => {
    console.log(post)
    return (
        <Col sm={3} md={2}>
            <div className="small-item-card">
                <div className="small-item-card__image">
                    <img src={post.image} alt="post" />
                </div>
                <p class="small-item-card__title">{post.title}</p>
                <p class="small-item-card__location">{post.location}</p>
                <p className="small-item-card__price"><b>${post.price}</b></p>
            </div>
        </Col>
    )
}

export default SmallItemCard;

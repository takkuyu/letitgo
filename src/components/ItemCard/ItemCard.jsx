import React from 'react';
import { Col } from 'reactstrap';
import { withRouter } from 'react-router-dom';

const ItemCard = ({ post, md, currentCategory, ...props }) => {
  return (
    <Col sm={3} md={md}>
      <div
        className="small-item-card"
        onClick={() => props.history.push(`/shop/${currentCategory}/${post.pid}`)}
      >
        <div className="small-item-card__image">
          <img src={post.imageurl} alt="post" />
        </div>
        <p className="small-item-card__title">{post.title}</p>
        <p className="small-item-card__location">{post.location}</p>
        <p className="small-item-card__price">
          <b>${post.price}</b>
        </p>
      </div>
    </Col>
  );
};

export default withRouter(ItemCard);

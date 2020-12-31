import React from 'react';
import { Col } from 'reactstrap';
import { withRouter } from 'react-router-dom';

const SmallItemCard = ({ post, md, history, match }) => {
  return (
    <Col sm={3} md={md}>
      <div
        className="small-item-card"
        onClick={() => history.push(`${match.url}/${post._id}`)}
      >
        <div className="small-item-card__image">
          <img src={post.image} alt="post" />
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

export default withRouter(SmallItemCard);

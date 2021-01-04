import React from 'react';
import { Col } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import directory from '../../constants/directory';

const ItemCard = ({ post, md, ...props }) => {
  const dir = Object.values(directory).find(dir => dir.category === post.category);
  return (
    <Col sm={3} md={md}>
      <div
        className="small-item-card"
        onClick={() => props.history.push(`/${dir.linkUrl}/${post.pid}`)}
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

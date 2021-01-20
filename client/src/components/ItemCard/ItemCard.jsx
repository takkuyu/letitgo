import React from 'react';
import { Col } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import directory from '../../constants/directory';

const defaultProps = {
  xs: 6,
  sm: 3,
  md: 6,
  lg: 2,
};

const ItemCard = ({ post, xs, sm, md, lg, ...props }) => {
  const dir = Object.values(directory).find(
    (dir) => dir.category === post.category
  );
  return (
    <Col xs={xs} sm={sm} md={md} lg={lg}>
      <div
        className="small-item-card"
        onClick={() => {
          props.history.push(`/${dir.linkUrl}/${post.pid}`);
          window.scrollTo({
            top: 0,
          });
        }}
      >
        <div className="small-item-card__image">
          <img src={post.imageurl} alt="post" />
        </div>
        <p className="small-item-card__title">{post.title}</p>
        <p className="small-item-card__location">{post.location}</p>
        <p className="small-item-card__price">
          <b>${post.price}</b>
        </p>
        {post.shipping && (
          <div className="free-shipping-text">Free shipping</div>
        )}
      </div>
    </Col>
  );
};

ItemCard.defaultProps = defaultProps;

export default withRouter(ItemCard);

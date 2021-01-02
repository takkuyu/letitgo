import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Breadcrumb from '../../components/breadcrumb/breadcrumb.component';
import star from '../../images/star.svg'
import SmallItemCard from '../../components/item-card/small-item-card.component'
import moment from 'moment'
import { isLoginModalOpenVar } from '../../cache';
import { useQuery, gql } from '@apollo/client';

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

const ItemPage = ({ item, recommendations, currentCategory, currentCategoryTitle }) => {
  const { data: { isLoggedIn } } = useQuery(IS_LOGGED_IN);

  return (
    <Container className="item-page">
      <Breadcrumb pathes={[currentCategoryTitle, item.title]} />
      <Row className="item-page-top">
        <Col lg={7} className="pr-4">
          <div className="item-page-top__image">
            <img src={item.imageurl} alt="item image" />
          </div>
        </Col>
        <Col lg={5} className="pl-4">
          <div className="item-page-top__content">
            <div className="item-page-top__content-title">{item.title}</div>
            <div className="item-page-top__content-price">${item.price}</div>
            <button className="item-page-top__content-jumbo-button button" onClick={() => {
              if (!isLoggedIn) {
                isLoginModalOpenVar(true);
                return
              }
            }}>Add to Wish List</button>
            <div className="item-page-top__content-detail">
              <div>Location:<span>{item.location}</span></div>
              <div>Posted on:<span>{moment(Number(item.created)).format("LL")}</span></div>
              <div>Condition:<span>{item.condition}</span></div>
            </div>
            <div className="item-page-top__content-description">
              <p className="item-page-top__content-description__title">Description</p>
              <p className="item-page-top__content-description__textarea"> {item.description}</p>
            </div>
            <div className="item-page-top__content-share">
              <ul>
                <li><a title="pinterest" target="_blank" rel="noreferrer noopener" href="https://www.pinterest.com/"> <i className="fab fa-pinterest" aria-hidden="true" /></a></li>
                <li><a title="instagram" target="_blank" rel="noreferrer noopener" href="https://www.instagram.com/"> <i className="fab fa-instagram" aria-hidden="true" /></a></li>
                <li><a href="https://www.facebook.com/" rel="noreferrer noopener" target="_blank" title="Facebook"> <i className="fab fa-facebook" aria-hidden="true" /></a></li>
                <li><a href="https://twitter.com" rel="noreferrer noopener" target="_blank" title="Twitter"> <i className="fab fa-twitter" aria-hidden="true" /></a></li>
              </ul>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="item-page-bottom">
        <Col lg={3}>
          <div className="item-page-bottom__seller">
            <p className="item-page-bottom__seller-title">About the seller</p>
            <div className="d-flex align-items-center mb-3 mt-3">
              <div className="item-page-bottom__seller-photo">
                <img src={"https://cdn.pixabay.com/photo/2016/12/19/21/36/winters-1919143__340.jpg"} alt="seller photo" />
              </div>
              <div className="item-page-bottom__seller-detail">
                <p className="item-page-bottom__seller-detail__name">Takaya Hirose</p>
                <p className="item-page-bottom__seller-detail__lists"><b>63</b> items listed</p>
              </div>
            </div>
            <ul className="item-page-bottom__seller-stars">
              <li><img src={star} alt="star" /></li>
              <li><img src={star} alt="star" /></li>
              <li><img src={star} alt="star" /></li>
              <li><img src={star} alt="star" /></li>
            </ul>
          </div>
        </Col>
        <Col lg={9}>
          <div className="item-page-bottom__message">
            <p className="item-page-bottom__message-title">Message the seller</p>
            <ul className="item-page-bottom__message-options">
              <li>Is it still available?</li>
              <li>Is the price negotiable?</li>
              <li>What condition is it in?</li>
            </ul>
            <div className="item-page-bottom__message-input">
              <input placeholder="Chat with John Doe" />
              <button className="button" onClick={() => {
                if (!isLoggedIn) {
                  isLoginModalOpenVar(true);
                  return
                }
              }}>Send</button>
            </div>
          </div>
        </Col>
      </Row>
      <div className="item-page-recommendations">
        <p className="item-page-recommendations__title">Similar items</p>
        <Row className="item-page-recommendations__row">
          {recommendations.map((item) =>
            item && (
              <SmallItemCard post={item} key={item.pid} md={3} currentCategory={currentCategory} />
            )
          )}
        </Row>
      </div>
    </Container >
  );
};

export default ItemPage;
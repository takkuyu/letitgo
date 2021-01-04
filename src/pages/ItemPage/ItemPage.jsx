import React, { useState } from 'react';
import { Container, Row, Col, Input } from 'reactstrap';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumbs';
import star from '../../assets/star.svg'
import ItemCard from '../../components/ItemCard/ItemCard'
import moment from 'moment'
import { isLoginModalOpenVar } from '../../graphql/cache';
import { gql, useMutation } from '@apollo/client';
import { useAuthState } from '../../context/auth';

const CREATE_ROOM = gql`
  mutation CreateRoom($to: String!, $post: String!) {
    createRoom(to: $to, post: $post) {
      rid
    },
  }
`;

const POST_MESSAGE = gql`
  mutation PostMessage($room: String!, $updatedWishList: String!, $content: String!) {
    postMessage(room: $room, to: $to, content: $content) {
      from
      to
      content
    },
  }
`;

const UPDATE_WISH_LIST = gql`
  mutation updateWishList($uid: String!, $updatedWishList: [String!]!) {
    updateWishList(uid: $uid, updatedWishList: $updatedWishList) {
      wishlist
    }
  }
`;

const ItemPage = ({ item, recommendations, currentCategoryTitle, ...props }) => {
  const [chatMessage, setChatMessage] = useState('')
  const { isLoggedin, user } = useAuthState();

  console.log(user)

  const [postMessage, { error: postMessageError }] = useMutation(POST_MESSAGE, {
    onCompleted: (data) => {
      console.log(data)
      props.history.push('/messages')
    },
    onError: (err) => console.log(err),
  });

  const [createRoom, { error }] = useMutation(CREATE_ROOM, {
    onCompleted: ({ createRoom }) => {
      if (createRoom) {
        postMessage({ variables: { room: createRoom.rid, to: String(item.createdby.uid), content: chatMessage } });
      }
    },
    onError: (err) => console.log(err),
  });

  const [updateWishList, { error: removeError }] = useMutation(UPDATE_WISH_LIST, {
    onError: (err) => console.log(err),
  });

  const startChat = () => {
    if (!isLoggedin) {
      isLoginModalOpenVar(true);
      return
    }

    if (chatMessage.trim() === '') return

    createRoom({ variables: { to: item.createdby.uid, post: item.pid } });
  }

  let actionButton;

  const isWished = user.wishlist && user.wishlist.includes(Number(item.pid));
  if (isWished) {
    actionButton = (
      <button className="item-page-top__content-jumbo-button button" onClick={() => {
        if (!isLoggedin) {
          isLoginModalOpenVar(true);
          return
        }
        const updatedWishList = user.wishlist.filter(list => String(list) !== item.pid);
        updateWishList({
          variables: { uid: user.uid, updatedWishList }
        })
      }}>Remove from Wish List</button>
    )
  } else {
    actionButton = (
      <button className="item-page-top__content-jumbo-button button" onClick={() => {
        if (!isLoggedin) {
          isLoginModalOpenVar(true);
          return
        }
        const updatedWishList = [...user.wishlist, item.pid];
        updateWishList({
          variables: { uid: user.uid, updatedWishList }
        })
      }}>Add to Wish List</button>
    );
  }

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
            {actionButton}
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
                <img src={item.createdby.picture} alt="seller photo" />
              </div>
              <div className="item-page-bottom__seller-detail">
                <p className="item-page-bottom__seller-detail__name">{item.createdby.username}</p>
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
              <Input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder={`Chat with ${item.createdby.username}`}
              />
              <button className="button" onClick={startChat}>Send</button>
            </div>
          </div>
        </Col>
      </Row>
      <div className="item-page-recommendations">
        <p className="item-page-recommendations__title">Similar items</p>
        <Row className="item-page-recommendations__row">
          {recommendations.map((item) =>
            item && (
              <ItemCard post={item} key={item.pid} md={3} />
            )
          )}
        </Row>
      </div>
    </Container >
  );
};

export default ItemPage;
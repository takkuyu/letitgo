import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Input } from 'reactstrap';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumbs';
import star from '../../assets/star.svg'
import ItemCard from '../../components/ItemCard/ItemCard'
import moment from 'moment'
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { useAuthDispatch, useAuthState } from '../../context/auth';
import { GET_ROOMS } from '../../components/MessageRooms/MessageRooms';
import { useMessageDispatch, useMessageState } from '../../context/message';

const CREATE_ROOM = gql`
  mutation CreateRoom($to: String!, $post: String!) {
    createRoom(to: $to, post: $post) {
      rid
    },
  }
`;

const POST_MESSAGE = gql`
  mutation PostMessage($room: String!, $to: String!, $content: String!) {
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
      uid
      username
      email
      password
      picture
      created
      token
      wishlist
    }
  }
`;

const DELET_POST = gql`
  mutation deletePost($pid: String!) {
    deletePost(pid: $pid) {
      pid
      title
      category
      imageurl
    }
  }
`;

const ItemPage = ({ item, recommendations, currentCategoryTitle, ...props }) => {
  const [chatMessage, setChatMessage] = useState('')
  const { isLoggedin, user } = useAuthState();
  const dispatch = useAuthDispatch();
  const { rooms } = useMessageState();
  const messageDispatch = useMessageDispatch()

  const [
    getRooms,
    { loading: roomsLoading, data: roomsData },
  ] = useLazyQuery(GET_ROOMS, {
    onCompleted: (data) => {
      messageDispatch({ type: 'SET_ROOMS', payload: data.getRooms });
    }
  })

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

  const [updateWishList, { error: updateError }] = useMutation(UPDATE_WISH_LIST, {
    onCompleted: ({ updateWishList }) => {
      dispatch({ type: 'UPDATE_USER', payload: updateWishList })
    },
    onError: (err) => console.log(err),
  });

  const [deletePost, { error: deleteError }] = useMutation(DELET_POST, {
    onCompleted: ({ deletePost }) => {
      props.history.push(`/`);
    },
    onError: (err) => console.log(err),
  });

  useEffect(() => {
    if (!rooms && user) {
      getRooms({ variables: { uid: String(user.uid) } })
    }
  }, [])

  const startChat = () => {
    if (!isLoggedin) {
      dispatch({ type: 'TOGGLE_LOGIN_MODAL' })
      return
    }

    if (chatMessage.trim() === '') return

    createRoom({ variables: { to: item.createdby.uid, post: item.pid } });
  }

  let actionButton;

  const isWished = user && user.wishlist && user.wishlist.includes(item.pid);
  const isCreatedBy = (user && item.createdby.uid === user.uid);

  if (isWished) {
    actionButton = (
      <button className="item-page-top__content-jumbo-button item-page-top__content-jumbo-button__filled button" onClick={() => {
        const updatedWishList = user.wishlist.filter(list => list !== item.pid);
        updateWishList({
          variables: { uid: user.uid, updatedWishList }
        })
      }}>Remove from Wish List</button>
    )
  } else if (isCreatedBy) {
    actionButton = (
      <div>
        <button
          className="item-page-top__content-jumbo-button item-page-top__content-jumbo-button__filled button mb-1"
          onClick={() => {
            props.history.push(`/edit/${item.pid}`)
          }}>Edit your item</button>
        <p className="item-page-top__content-delete">
          <span onClick={() => {
            deletePost({
              variables: { pid: item.pid },
            })
          }}>Or delete your item</span>
        </p>
      </div>
    )
  } else {
    actionButton = (
      <button className="item-page-top__content-jumbo-button button" onClick={() => {
        if (!isLoggedin) {
          dispatch({ type: 'TOGGLE_LOGIN_MODAL' })
          return
        }
        const updatedWishList = [...user.wishlist, item.pid];

        console.log(updatedWishList)

        updateWishList({
          variables: { uid: user.uid, updatedWishList }
        })
      }}>Add to Wish List</button>
    );
  }

  let chatStarted = false;
  if (rooms && user) {
    const roomMembers = [user.uid, item.createdby.uid];
    for (const room of rooms) {
      if (roomMembers.includes(room.from.uid) && roomMembers.includes(room.to.uid)) {
        chatStarted = true;
        break
      }
    }
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
            <div className="item-page-top__content-price">${item.price} {item.shipping && <span className="free-shipping-text">Free Shipping</span>}</div>
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
              <li onClick={() => setChatMessage('Is it still available?')}>Is it still available?</li>
              <li onClick={() => setChatMessage('Is the price negotiable?')}>Is the price negotiable?</li>
              <li onClick={() => setChatMessage('What condition is it in?')}>What condition is it in?</li>
            </ul>
            {
              chatStarted ? (
                <div className="item-page-bottom__message-continue">
                  <span>Continue chatting with {item.createdby.username}</span>
                  <button className="button" onClick={() => props.history.push('/messages')}>Continue</button>
                </div>
              ) : (
                  <div className="item-page-bottom__message-input">
                    <Input
                      type="text"
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      placeholder={`Chat with ${item.createdby.username}`}
                    />
                    {
                      !isCreatedBy ? (
                        <button className="button" onClick={startChat}>Send</button>
                      ) : (
                          <button className="button button-disable">Send</button>
                        )
                    }
                  </div>
                )
            }
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
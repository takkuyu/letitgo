import { gql, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { Fragment } from 'react';
import { Col, Nav, NavItem, Row } from 'reactstrap';
import ItemCard from '../../components/ItemCard/ItemCard';
import Spinner from '../../components/Spinner/Spinner';
import { useAuthState } from '../../context/auth';

const NAV_OPTIONS = { WISH: 'wish', RECENT: 'recent' };

const GET_WISH_LIST = gql`
  query getWishList($uid:String!) {
    getWishList(uid: $uid) {
      pid
      title
      price
      imageurl
      location
      category
      condition
      description
      created
    }
  }
`;

const GET_POSTS_BY_USER = gql`
  query getPostsByUser($uid:String!) {
    getPostsByUser(uid: $uid) {
      pid
      title
      price
      imageurl
      location
      category
      condition
      description
      created
    }
  }
`;

const Profile = () => {
  const [activeNav, setActiveNav] = useState(NAV_OPTIONS.WISH);
  const { user } = useAuthState();

  console.log(user)

  const { loading: wishListLoading, data: wishListData } = useQuery(GET_WISH_LIST, {
    variables: { uid: user.uid },
    fetchPolicy:'no-cache'
  });

  const { loading: postsLoading, data: postsData } = useQuery(GET_POSTS_BY_USER, {
    variables: { uid: user.uid },
    fetchPolicy:'no-cache'
  });

  if (postsLoading || wishListLoading) return (
    <Spinner />
  )

  return (
    <div className="profile-page mx-auto">
      <div className="rounded overflow-hidden">

        <div className="pt-0 pb-4 cover">
          <div className="media align-items-end profile-head">
            <div className="profile mr-3">
              <img src={user.picture} alt="user image" className="rounded mb-2 img-thumbnail" />
              <button className="btn-under-construction btn btn-outline-dark btn-sm btn-block">Edit profile</button>
            </div>
            <div className="media-body mb-5 text-white">
              <h4 className="mt-0 mb-0">{user.username}</h4>
              <p className="small mb-4"> <i className="fas fa-map-marker-alt mr-2"></i>Toronto</p>
            </div>
          </div>
        </div>

        <div className="bg-light p-4 d-flex justify-content-end text-center">
          <ul className="list-inline mb-0">
            <li className="list-inline-item">
              <h5 className="font-weight-bold mb-0 d-block">{postsData && postsData.getPostsByUser.length}</h5><small className="text-muted">items listed</small>
            </li>
            <li className="list-inline-item">
              <h5 className="font-weight-bold mb-0 d-block">{wishListData && wishListData.getWishList.length}</h5><small className="text-muted">in wish list</small>
            </li>
          </ul>
        </div>

        <div className="px-0 py-3">
          <h5 className="mb-3">About</h5>
          <div className="p-4 rounded shadow-sm bg-light">
            <p>
              I love to buy different designer pieces and when I get bored with them I sell them so they find new homes where they can be treasured like they were by me.
              I collect some items too and never use them lol so you will also find brand new items on my page. All my listings are 100% authentic guaranteed. Thanks for stopping by!
            </p>
          </div>
        </div>

        <Nav className="nav-tabs">
          <NavItem className="mr-3">
            <p className={`nav-link ${activeNav === NAV_OPTIONS.WISH ? 'active' : ''}`} onClick={() => setActiveNav(NAV_OPTIONS.WISH)} >Wish List</p>
          </NavItem>
          <NavItem className="ml-3">
            <p className={`nav-link ${activeNav === NAV_OPTIONS.RECENT ? 'active' : ''}`} onClick={() => setActiveNav(NAV_OPTIONS.RECENT)}>Your Items</p>
          </NavItem>
        </Nav>

        <Row>
          {
            activeNav === NAV_OPTIONS.WISH ? (
              !wishListData || wishListData.getWishList.length === 0 ? (
                <Col>No items added yet.</Col>
              ) : (
                  <Fragment>
                    {
                      wishListData.getWishList.map(item => (
                        <ItemCard key={item.pid} post={item} md={3} />
                      ))
                    }
                  </Fragment>
                )
            ) : (
                !postsData || postsData.getPostsByUser.length === 0 ? (
                  <Col>No items listed yet.</Col>
                ) : (
                    <Fragment>
                      {
                        postsData.getPostsByUser.map(item => (
                          <ItemCard key={item.pid} post={item} md={3} />
                        ))
                      }
                    </Fragment>
                  )
              )
          }
        </Row>

      </div>
    </div>
  );
}

export default Profile;

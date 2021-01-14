import React from 'react';
import { Container } from 'reactstrap';
import CollectionOverview from '../../components/CollectionOverview/CollectionOverview';
import { default as categories } from '../../constants/directory';
import { useQuery, gql } from '@apollo/client';
import Spinner from '../../components/Spinner/Spinner';
import HeroImage from '../../assets/hero-image.png'
import { useAuthDispatch, useAuthState } from '../../context/auth';

const GET_POSTS_OVERVIEW = gql`
  query {
    postsOverview {
      pid
      title
      price
      imageurl
      location
      category
      shipping
    }
  }
`;

const HomePage = ({ ...props }) => {
  const { loading, error, data } = useQuery(GET_POSTS_OVERVIEW);
  const { isLoggedin } = useAuthState();
  const dispatch = useAuthDispatch();

  if (loading) return <Spinner />;
  if (error) return <p>Error :</p>;

  return (
    <div className="homepage">
      <div className="homepage__top">
        <Container>
          <div className="homepage__top-wrapper">
            <div className="homepage__top-wrapper-content">
              <p className="leading">Sell from home</p>
              <p className="sub-leading">Make a little money.</p>
              <button
                onClick={() => {
                  if (isLoggedin) {
                    props.history.push('/sell')
                    return
                  }
                  dispatch({ type: 'TOGGLE_LOGIN_MODAL' })
                }}
                className="button btn-color-orange">
                Sell now
              </button>
            </div>
            <img
              src={HeroImage}
              alt="wallet"
            />
          </div>
        </Container>
      </div>
      <Container>
        {Object.values(categories).map((category, index) =>
          category.category !== 'Other' && (
            <CollectionOverview
              key={index}
              category={category}
              posts={data.postsOverview.filter(post => post.category === category.category)}
            />
          )
        )}
      </Container>
    </div>
  );
}
export default HomePage;

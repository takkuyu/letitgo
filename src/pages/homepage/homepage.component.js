import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';
import CollectionOverview from '../../components/collection/collection-overview.component';
import { default as categories } from '../../constants/directory';
import { useQuery, gql } from '@apollo/client';
import Spinner from '../../components/with-spinner/Spinner';

const GET_POSTS_OVERVIEW = gql`
  query {
    postsOverview {
      pid
      title
      price
      imageurl
      location
      category
    }
  }
`;

const HomePage = () => {
  const { loading, error, data } = useQuery(GET_POSTS_OVERVIEW);

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
              <p className="link-btn">
                <Link to="">Sell now</Link>
              </p>
            </div>
            <img
              src="https://u-web-assets.mercdn.net/assets/banner/lux-sell-desktop.png"
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

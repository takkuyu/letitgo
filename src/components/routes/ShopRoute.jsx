import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import CollectionPage from '../../pages/CollectionPage/CollectionPage';
import { useQuery, gql } from '@apollo/client';
import { default as categories } from '../../constants/directory';
import ItemPageContainer from '../../pages/ItemPage/ItemPageContainer';
import Spinner from '../Spinner/Spinner';

const GET_POSTS_BY_CATEGORY = gql`
  query getPostsByCategory($category:String!) {
    postsByCategory(category: $category) {
      pid
      title
      createdby {
        uid
        username
        picture
      }
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

const ShopRoute = ({ match, location }) => {
  const currentCategory = match.params.category;

  const { loading, error, data } = useQuery(GET_POSTS_BY_CATEGORY, {
    variables: { category: categories[currentCategory]['category'] },
  });

  if (loading) return <Spinner />;
  if (error) return <p>Error :</p>;

  return (
    <Fragment>
      <Route
        path={`${match.url}`}
        key={location.key}
        exact
        render={(props) => (
          <CollectionPage
            collectionItems={data.postsByCategory}
            currentCategory={currentCategory}
            currentCategoryTitle={categories[currentCategory]['category']}
            {...props}
          />
        )}
      />
      <Route
        path={`${match.url}/:id`}
        exact
        render={(props) => (
          <ItemPageContainer
            collectionItems={data.postsByCategory}
            currentCategory={currentCategory}
            currentCategoryTitle={categories[currentCategory]['category']}
            {...props}
          />
        )}
      />
    </Fragment>
  );
}

export default ShopRoute;

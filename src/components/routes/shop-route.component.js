import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import CollectionPage from '../../pages/collection/collectionpage.component';
import { useQuery, gql } from '@apollo/client';
import { default as categories } from '../../constants/directory';
import { ItempageContainer } from '../../pages/itempage/itempage.container';
import Spinner from '../with-spinner/Spinner';

const GET_POSTS_BY_CATEGORY = gql`
  query getPostsByCategory($category:String!) {
    postsByCategory(category: $category) {
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

const CollectionRoute = ({ match, location }) => {
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
          <ItempageContainer
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

export default CollectionRoute;

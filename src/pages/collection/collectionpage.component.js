import React from 'react';
import { Row, Col, Container } from 'reactstrap';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectPostsByCategory } from '../../redux/postings/postings.selectors';
import Breadcrumb from '../../components/breadcrumb/breadcrumb.component';
import filterLists from '../../components/filter/filter.lists';
import Filter from '../../components/filter/filter.component';
import SmallItemCard from '../../components/item-card/small-item-card.component';
import queryString from 'query-string';

function getTitleFromCategory(category) {
  if (category === 'men' || category === 'women') {
    return 'Fashion for' + ' ' + capitalizeFirstLetter(category);
  }
  return capitalizeFirstLetter(category);
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const CollectionPage = ({ collectionItems, match, location, category }) => {
  return (
    <div className="collection-page">
      <Container>
        <Breadcrumb
          paths={match.params}
          capitalizeFirstLetter={capitalizeFirstLetter}
          category={category}
        />
        <Row>
          <Col md={3}>
            <div className="collection-page__filter">
              <div className="collection-filter">
                <p className="collection-filter__heading">Filter by:</p>
                {filterLists.map((filter) => (
                  <Filter
                    filter={filter}
                    key={filter.id}
                    match={match}
                    location={location}
                  />
                ))}
              </div>
            </div>
          </Col>
          <Col md={9}>
            <div className="collection-page__main">
              <h1>{getTitleFromCategory(category)}</h1>
              <div className="collection-page__main-content">
                <Row>
                  {collectionItems.map((post, index) =>
                    post ? <SmallItemCard post={post} key={index} md={3} /> : ''
                  )}
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  console.log('mapStateToProps');
  console.log(ownProps);
  const filters = queryString.parse(ownProps.location.search);
  return {
    collectionItems: selectPostsByCategory(ownProps.category, filters)(state),
  };
};

export default connect(mapStateToProps)(CollectionPage);

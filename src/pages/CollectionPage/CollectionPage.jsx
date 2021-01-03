import React, { useState, useEffect } from 'react';
import { Row, Col, Container } from 'reactstrap';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumbs';
import { filtersLists } from '../../constants/filter';
import Filter from '../../components/Filter/Filter';
import ItemCard from '../../components/ItemCard/ItemCard';
import queryString from 'query-string';
import filterItems from '../../utils/filterItems';

const CollectionPage = ({ collectionItems, currentCategory, currentCategoryTitle, match, location }) => {
  const [items, setItems] = useState([]);
  const filters = queryString.parse(location.search);

  useEffect(() => {
    const filteredItems = filterItems(collectionItems, filters);

    setItems(filteredItems)
  }, [])

  return (
    <div className="collection-page">
      <Container>
        <Breadcrumb
          pathes={[currentCategoryTitle]}
        />
        <Row>
          <Col md={3}>
            <div className="collection-page__filter">
              <div className="collection-filter">
                <p className="collection-filter__heading">Filter by:</p>
                {filtersLists.map((filter) => (
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
              <h1>{currentCategoryTitle}</h1>
              <div className="collection-page__main-content">
                <Row>
                  {items.map((post) =>
                    post && (
                      <ItemCard post={post} key={post.pid} md={3} currentCategory={currentCategory} />
                    )
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


export default CollectionPage;

import React, { useState, useEffect } from 'react';
import { Row, Col, Container } from 'reactstrap';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumbs';
import { filtersLists } from '../../constants/filter';
import Filter from '../../components/Filter/Filter';
import MobileFilter from '../../components/Filter/MobileFIlter';
import ItemCard from '../../components/ItemCard/ItemCard';
import queryString from 'query-string';
import filterItems from '../../utils/filterItems';

const CollectionPage = ({
  collectionItems,
  currentCategoryTitle,
  match,
  location,
}) => {
  const [items, setItems] = useState([]);
  const filters = queryString.parse(location.search);

  useEffect(() => {
    const filteredItems = filterItems(collectionItems, filters);

    setItems(filteredItems);
  }, []);

  return (
    <div className="collection-page">
      <Container>
        <Breadcrumb
          pathes={[
            {
              label: currentCategoryTitle,
              link: '',
            },
          ]}
        />
        <Row>
          <Col sm={4} md={3} className="collection-page__filter">
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
          <Col sm={8} md={9}>
            <div className="collection-page__main pb-5">
              <div className="d-flex justify-content-between align-items-center">
                <h1 className="mb-0">{currentCategoryTitle}</h1>
                <MobileFilter />
              </div>
              <div className="collection-page__main-content">
                <Row>
                  {items.map(
                    (post) =>
                      post && (
                        <ItemCard post={post} key={post.pid} sm={6} md={3} lg={3} />
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

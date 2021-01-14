import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { filtersLists } from '../../constants/filter';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from 'reactstrap';
import Filter from './Filter';

const MobileFilterModal = ({ isOpen, toggle, match, location, history }) => {

  return (
    <Modal isOpen={isOpen} fade={false} toggle={toggle} centered={true}>
      <ModalHeader toggle={toggle} className="pb-2">Filter items</ModalHeader>
      <ModalBody className="py-0">
        {filtersLists.map((filter) => (
          <Filter
            filter={filter}
            key={filter.id}
            match={match}
            location={location}
            closeModal={toggle}
          />
        ))}
      </ModalBody>
      <ModalFooter className="border-top-0">
        <button className="button mr-3" onClick={() => history.push(match.url)}>Clear filters</button>{' '}
        <button className="btn btn-outline-secondary" onClick={toggle}>Back</button>
      </ModalFooter>
    </Modal>
  )
}

const MobileFilter = ({ ...props }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="mobile-filter">
      <button className="button button-outline-primary" onClick={toggle} >Filter</button>
      {isOpen && <MobileFilterModal isOpen={isOpen} toggle={toggle} {...props} />}
    </div>
  );
};

export default withRouter(MobileFilter);

import React from 'react';

const SearchBox = ({ searchChange }) => {
  return (
    <div className="search-box">
      {/* <input type="search" className="searchTerm" placeholder="What are you looking for?" onChange={searchChange} /> */}
      <i className="fa fa-search"></i>
      <input
        type="search"
        placeholder="Search letitgo"
        onChange={searchChange}
      />
    </div>
  );
};

export default SearchBox;

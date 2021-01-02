import React from 'react';

const SearchBox = ({ searchChange }) => {
  return (
    <div className="search-box">
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

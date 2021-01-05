import React, { useState, useEffect } from 'react';

const SearchBox = ({ searchChange }) => {
  const [context, setContent] = useState('');

  return (
    <div className="search-box">
      <i className="fa fa-search"></i>
      <input
        type="search"
        placeholder="Search letitgo"
        onChange={(e) => setContent(e.target.value)}
        value={context}
      />
      {
        context.length > 0 && (
          <div className="search-box-results">
            NOT IMPLEMENTED
          </div>
        )
      }
    </div>
  );
};

export default SearchBox;

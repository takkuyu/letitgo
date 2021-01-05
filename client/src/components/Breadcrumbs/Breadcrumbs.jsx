import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ pathes }) => {
  return (
    <ul className="breadcrumb">
      <li><Link to="/">Home</Link></li>
      {
        pathes.map(path => (
          <li key={path} >{path}</li>
        ))
      }
    </ul>
  );
};

export default Breadcrumb;

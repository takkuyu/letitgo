import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ pathes }) => {
  return (
    <div className="breadcrumb">
      <span><Link to="/">Home</Link></span>
      {
        pathes.map(path => (
          <span key={path.label} >
            {
              path.link ? (
                <Link to={path.link}>{path.label}</Link>
              ) : (
                  path.label
                )
            }
          </span>
        ))
      }
    </div>
  );
};

export default Breadcrumb;

import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ categories }) => {
  return (
    <nav className="navigation">
      <ul className="navigation__list">
        {categories.map((category, index) => (
          <li key={index}>
            <Link to={`/${category.linkUrl}`}>{category.category}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;

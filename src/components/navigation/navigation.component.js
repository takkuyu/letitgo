import React from 'react';
import { Link } from 'react-router-dom';
import { default as categories } from '../../constants/directory';

const Navigation = () => {
  return (
    <nav className="navigation">
      <ul className="navigation__list">
        {Object.values(categories).map((category, index) => (
          <li key={index}>
            <Link to={`/${category.linkUrl}`}>{category.category}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;

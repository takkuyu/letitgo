import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ capitalizeFirstLetter, category }) => {
    return (
        <ul className="breadcrumb">
            <li><Link to="/">Home</Link></li>
            <li>{capitalizeFirstLetter(category)}</li>
        </ul>
    )
};

export default Breadcrumb;
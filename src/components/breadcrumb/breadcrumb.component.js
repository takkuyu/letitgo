import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ paths, capitalizeFirstLetter, match }) => {
    // console.log(match)
    return (
        <ul className="breadcrumb">
            <li><Link to="/">Home</Link></li>
            <li>{capitalizeFirstLetter(paths.category)}</li>
        </ul>
    )
};

export default Breadcrumb;
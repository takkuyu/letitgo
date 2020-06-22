import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav className="navigation" >
            <ul className="navigation__list">
                <li><Link to="">Women</Link></li>
                <li><Link to="">Men</Link></li>
                <li><Link to="">Electrics</Link></li>
                <li><Link to="">Vehicles</Link></li>
                <li><Link to="">Home</Link></li>
                <li><Link to="">Other</Link></li>
            </ul>
        </nav >
    );
}

export default Navigation;

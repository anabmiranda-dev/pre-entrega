import React from "react";
import { Link } from 'react-router-dom';
import '../src/App.css';

function Nav() {
    return (

        <nav className="nav nabvar navbar-light">
            <a className="navbar-brand" href="#">
                <img src="/src/assets/icon-metal-relics.png" width="40"  alt="metal-relics-icon"/>
            </a>
            <ul className="nav-list">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/cart">Cart</Link></li>
            </ul>
        </nav>
    );
}

export default Nav;
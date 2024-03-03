import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="weather-header">
      <NavLink to="/" className="logo">
        Weather Pal
      </NavLink>
      <nav className="nav-links">
        <NavLink to="/" className="nav-link">
          Home
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;

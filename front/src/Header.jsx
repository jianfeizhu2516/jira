import React from 'react';
import './Header.scss';

const Header = ({ username }) => {
  return (
    <div className="header">
      <h1 className="header-title">Task Master</h1>
      <div className="header-email">{username || 'Guest'}</div>
    </div>
  );
};

export default Header;
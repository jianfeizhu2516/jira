import React from 'react';
import './Header.scss'; // 引入样式文件

const Header = () => {
  return (
    <div className="header">
      <h1 className="header-title">Task Master</h1>
      <div className="header-email">johnDoe@gmail.com</div>
    </div>
  );
};

export default Header;
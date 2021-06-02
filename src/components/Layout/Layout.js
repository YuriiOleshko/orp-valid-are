import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Tabs from './Tabs';

const Layout = (props) => {
  const { children } = props;
  return (
    <div className="layout">
      <Header />
      <div className="content">
        <Tabs />
        <div className="page">{children}</div>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.element,
};

export default Layout;

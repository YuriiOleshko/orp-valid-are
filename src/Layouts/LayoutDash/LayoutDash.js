import React from 'react';
import { useLocation } from 'react-router';
import PropTypes from 'prop-types';
import Header from '../Layout/Header';
import Tabs from '../Layout/Tabs';
import Menu from './Menu';

const LayoutDash = (props) => {
  const { children } = props;
  const location = useLocation();
  const { data } = location.state;
  return (
    <div className="layout__dash">
      <Header />
      <Menu data={data} />
      <div className="content">
        <Tabs />
        <div className="page">{children}</div>
      </div>
    </div>
  );
};

LayoutDash.propTypes = {
  children: PropTypes.element,
};

export default LayoutDash;

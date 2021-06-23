import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FormattedDate, useIntl } from 'react-intl';
import PropTypes from 'prop-types';

import {
  ongoingValid,
  ongoingChallanges,
  futureUploads,
  pastStages,
  projectInfo,
  copyRight,
} from './LangMenu';

const Menu = ({ data }) => {
  const intl = useIntl();
  const { pathname } = useLocation();
  const [name] = pathname.split('/').splice(-1);

  return (
    <div className="menu">
      <div className="menu__wrapper">
        <div className="menu__nav">
          <div className="menu__list">
            <NavLink
              className="menu__item"
              activeClassName="active"
              exact
              to={{ pathname: `/project/validation/${name}`, state: { data } }}
            >
              <i className="icon-charning" />
              {intl.formatMessage(ongoingValid)}
            </NavLink>
            <NavLink
              className="menu__item"
              activeClassName="active"
              exact
              to={{ pathname: `/project/challenge/${name}`, state: { data } }}
            >
              <i className="icon-shield" />
              {intl.formatMessage(ongoingChallanges)}
            </NavLink>
            <NavLink
              className="menu__item"
              activeClassName="active"
              exact
              to="/future-uploads"
            >
              <i className="icon-shield-gal" />
              {intl.formatMessage(futureUploads)}
            </NavLink>
            <NavLink
              className="menu__item"
              activeClassName="active"
              exact
              to="/past-stages"
            >
              <i className="icon-schems" />
              {intl.formatMessage(pastStages)}
            </NavLink>
            <NavLink
              className="menu__item"
              activeClassName="active"
              exact
              to="/project-info"
            >
              <i className="icon-vilka1" />
              {intl.formatMessage(projectInfo)}
            </NavLink>
          </div>
        </div>
        <p className="menu__copy">
          {intl.formatMessage(copyRight)}
          <FormattedDate value={Date.now()} year="numeric" />
        </p>
      </div>
    </div>
  );
};

Menu.propTypes = {
  data: PropTypes.object,
};

export default Menu;

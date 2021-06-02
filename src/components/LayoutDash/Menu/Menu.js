import React from 'react';
import { NavLink } from 'react-router-dom';
import { FormattedDate, useIntl } from 'react-intl';

import {
  ongoingValid,
  ongoingChallanges,
  futureUploads,
  pastStages,
  projectInfo,
  copyRight,
} from './LangMenu';

const Menu = () => {
  const intl = useIntl();
  return (
    <div className="menu">
      <div className="menu__wrapper">
        <div className="menu__nav">
          <div className="menu__list">
            <NavLink
              className="menu__item"
              activeClassName="active"
              exact
              to="/ongoing-validation"
            >
              <i className="icon-charning" />
              {intl.formatMessage(ongoingValid)}
            </NavLink>
            <NavLink
              className="menu__item"
              activeClassName="active"
              exact
              to="/ongoing-challenges"
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

export default Menu;

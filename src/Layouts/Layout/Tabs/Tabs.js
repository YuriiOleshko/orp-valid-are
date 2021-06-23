import React from 'react';
import { useIntl } from 'react-intl';
import { NavLink } from 'react-router-dom';
import { tabTimeline, tabDataUploads, tabChallenges } from './LangTabs';

const Tabs = () => {
  const intl = useIntl();
  return (
    <div className="tabs">
      <NavLink exact to="/" activeClassName="tab-active" className="tab">
        {intl.formatMessage(tabTimeline)}
      </NavLink>
      <NavLink
        exact
        to="/data-uploads"
        activeClassName="tab-active"
        className="tab"
      >
        {intl.formatMessage(tabDataUploads)}
      </NavLink>
      <NavLink
        exact
        to="/challenges"
        activeClassName="tab-active"
        className="tab"
      >
        {intl.formatMessage(tabChallenges)}
      </NavLink>
    </div>
  );
};

export default Tabs;

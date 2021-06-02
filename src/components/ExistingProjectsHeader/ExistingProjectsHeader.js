import React, { useContext } from 'react';
import { useIntl } from 'react-intl';
import { Page } from '../../routes';

import {
  validationStatus,
  challengeStatus,
  projectText,
  dataUploadText,
  stageText,
  validationOpen,
  challengeOpen,
  areaText,
  locationText,
} from '../ExistingProjects/LangExistingProjects';

const ExistingProjectsHeader = () => {
  const intl = useIntl();
  const page = useContext(Page);
  return (
    <div className="validation__data-header">
      <div className="header-status">
        {page === 'data-uploads' ? (
          <span>{intl.formatMessage(validationStatus)}</span>
        ) : (
          <span>{intl.formatMessage(challengeStatus)}</span>
        )}
      </div>
      <div className="header-project">
        <span>{intl.formatMessage(projectText)}</span>
      </div>
      <div className="header-upload">
        <span>{intl.formatMessage(dataUploadText)}</span>
      </div>
      <div className="header-stage">
        <span>{intl.formatMessage(stageText)}</span>
      </div>
      <div className="header-open">
        {page === 'data-uploads' ? (
          <span>{intl.formatMessage(validationOpen)}</span>
        ) : (
          <span>{intl.formatMessage(challengeOpen)}</span>
        )}
      </div>
      <div className="header-area">
        <span>{intl.formatMessage(areaText)}</span>
      </div>
      <div className="header-location">
        <span>{intl.formatMessage(locationText)}</span>
      </div>
    </div>
  );
};

export default ExistingProjectsHeader;

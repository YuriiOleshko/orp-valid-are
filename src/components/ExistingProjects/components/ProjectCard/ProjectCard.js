/* eslint-disable  jsx-a11y/click-events-have-key-events */
/* eslint-disable  jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import Status from '../Status';
import { Page } from '../../../../routes';
import { formattedDate } from '../../../../utils/convert-utils';

const ProjectCard = ({ data }) => {
  const page = useContext(Page);
  const [isPinned, setIsPinned] = useState(false);
  const history = useHistory();
  const {
    status,
    name,
    dataUpload,
    stage,
    openDate,
    closeDate,
    area,
    location,
  } = data;
  return (
    <div
      className="list-item"
      onClick={() => {
        setIsPinned(!isPinned);
        history.push({
          pathname:
            page === 'data-uploads'
              ? `/project/validation/${name}`
              : `/project/challenge/${name}`,
          state: { data },
        });
      }}
    >
      <Status status={status} />
      <div className="item-project">
        <span>{name}</span>
      </div>
      <div className="item-upload">
        <span>{dataUpload}</span>
      </div>
      <div className="item-stage">
        <span>{stage}</span>
      </div>
      <div className="item-open">
        <span>{formattedDate(openDate, '.')}</span>/
        <span>{formattedDate(closeDate, '.')}</span>
      </div>
      <div className="item-area">
        <span>{area}</span>
      </div>
      <div className="item-location">
        <span>{location}</span>
        {isPinned && <i className="icon-pin" />}
      </div>
    </div>
  );
};

ProjectCard.propTypes = {
  data: PropTypes.object,
};

export default ProjectCard;

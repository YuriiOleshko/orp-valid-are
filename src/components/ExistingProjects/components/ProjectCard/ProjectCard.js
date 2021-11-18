/* eslint-disable  jsx-a11y/click-events-have-key-events */
/* eslint-disable  jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable */
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import Status from '../Status';
import Page from '../../../../utils/context';
import { formattedDate } from '../../../../utils/convert-utils';

const ProjectCard = ({ data }) => {
  const page = useContext(Page);
  const [isPinned, setIsPinned] = useState(false);
  const history = useHistory();
  const { id, item } = data;
  const {
    region,
    finishTimeProject,
    startTimeProject,
    square,
    name,
    stages,
    subZonesPolygon,
  } = item;

  const now = Date.now() * 1e6;
  let currentStage;
  // let currentPeriod;
  let periodOpen;
  let dataUpload;
  let status;

  const defineProjectInfo = (currStg, targetStg, prevStgId, page) => {
    const targetPeriod = targetStg.periods.find((per) => {
      if (page === 'data-uploads') return per.id === 0;
      else return per.id >= 1;
    });
    const currentDataUpload = subZonesPolygon?.find(
      (sub) => sub.stage === prevStgId,
    );
    if (targetPeriod.starts_at <= now && targetPeriod.ends_at >= now) status = 'open';
    if (targetPeriod.ends_at <= now) status = 'completed';
    if (targetPeriod.starts_at >= now) status = 'pending';
    currentStage = currStg.id;
    dataUpload = currentDataUpload?.dataUploadTime;
    periodOpen = `
    ${formattedDate(targetPeriod.starts_at / 1e6, '.')}
    /
    ${formattedDate(targetPeriod.ends_at / 1e6, '.')}
    `;
  }

  const initialFunc = (page) => {
    const currStage = stages.find(
      (stg) => stg.starts_at <= now && stg.ends_at >= now,
    );
    if (currStage) {
      if (currStage.id === 0) {
        defineProjectInfo(currStage, currStage, 0, page)
      }
      if (currStage.id >= 1) {
        defineProjectInfo(currStage, stages[currStage.id - 1], currStage.id - 1, page);
      }
    } else {
      const lastStage = stages[stages.length - 1];
      defineProjectInfo(lastStage, lastStage, lastStage.id, page);
    }
  };

  initialFunc(page);

  return (
    <div
      className="list-item"
      onClick={() => {
        setIsPinned(!isPinned);
        history.push({
          pathname:
            page === 'data-uploads'
              ? `/project/validation/${id}`
              : `/project/challenge/${id}`,
          state: { data },
        });
      }}
    >
      <Status status={status} />
      <div className="item-project">
        <span>{name}</span>
      </div>
      <div className="item-upload">
        <span>{dataUpload ? formattedDate(startTimeProject, '.') : '---'}</span>
      </div>
      <div className="item-stage">
        <span>{currentStage}</span>
      </div>
      <div className="item-open">{periodOpen}</div>
      <div className="item-area">
        <span>{square}</span>
      </div>
      <div className="item-location">
        <span>{region}</span>
        {isPinned && <i className="icon-pin" />}
      </div>
    </div>
  );
};

ProjectCard.propTypes = {
  data: PropTypes.object,
};

export default ProjectCard;

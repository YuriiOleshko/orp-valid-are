/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Ongoing from '../../../../components/Ongoing';
import VoteForm from '../../../../components/VoteForm';
import StageReport from '../../../../components/StageReport';
import Resolution from '../../../../components/Resolution';
import PreviewReport from '../../../../components/PreviewReport';

import fullTree1 from '../../../../assets/image/trees/fullTree1.svg';
import fullTree2 from '../../../../assets/image/trees/fullTree2.svg';
import fullTree3 from '../../../../assets/image/trees/fullTree3.svg';
import grownTree1 from '../../../../assets/image/trees/grownTree1.svg';
import grownTree2 from '../../../../assets/image/trees/grownTree2.svg';
import grownTree3 from '../../../../assets/image/trees/grownTree3.svg';
import afterTree1 from '../../../../assets/image/trees/afterTree1.svg';
import afterTree2 from '../../../../assets/image/trees/afterTree2.svg';
import afterTree3 from '../../../../assets/image/trees/afterTree3.svg';

const treeImages = [
  [fullTree1, grownTree1, afterTree1],
  [fullTree2, grownTree2, afterTree2],
  [fullTree3, grownTree3, afterTree3],
];
const randomTreeImage = treeImages[Math.round(Math.random() * 2)];

const ProjectEscalation = ({ data }) => {
  const {
    timeLeft,
    validationFinished,
    stakingFinished,
    setStakingFinished,
    escalationPeriod,
    arrOfResolution,
    currentStage,
  } = data;

  const [viewStageReport, setViewStageReport] = useState(false);

  return (
    <div className="project">
      <div className="project__header">
        <div>
          <h2 className="project__header-subtitle">Project name</h2>
          <h1 className="project__header-title">{data.item.name}</h1>
        </div>
        <StageReport setViewStageReport={setViewStageReport} />
      </div>
      {viewStageReport && (
        <PreviewReport
          setViewStageReport={setViewStageReport}
          totalData={data.item}
          currentStage={currentStage}
        />
      )}
      {arrOfResolution.map((item, index) => {
        if (index === 0) {
          return (
            <Resolution
              period="Validation"
              {...item}
              key={Date.now() + index}
            />
          );
        }
        if (index === 1) {
          return (
            <Resolution period="Challenge" {...item} key={Date.now() + index} />
          );
        }
        return (
          <Resolution period="Escalation" {...item} key={Date.now() + index} />
        );
      })}
      <div className="project__body">
        <Ongoing
          data={data}
          stakingFinished={stakingFinished}
          setStakingFinished={setStakingFinished}
          title="Ongoing Escalation Window"
        />
        <div className="project__validation-info">
          <VoteForm
            data={data}
            stakingFinished={stakingFinished}
            setStakingFinished={setStakingFinished}
            validationFinished={validationFinished}
            escalationPeriod={escalationPeriod}
            challengePeriod
          />
        </div>
      </div>
    </div>
  );
};

ProjectEscalation.propTypes = {
  data: PropTypes.object,
};

export default ProjectEscalation;

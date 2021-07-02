/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Ongoing from '../../../../components/Ongoing';
import OngoingResult from '../../../../components/OngoingResult';
import VoteInfo from '../../../../components/VoteInfo';
import VoteForm from '../../../../components/VoteForm';
import StageReport from '../../../../components/StageReport';
import StageStatus from '../StageStatus';
import Resolution from '../../../../components/Resolution';
import ValidationResult from '../ValidationResult';
import ValidationStats from '../ValidationStats';

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
    name,
    openDate,
    closeDate,
    affirmed,
    timeLeft,
    validationFinished,
    stakingFinished,
    setStakingFinished,
    escalationPeriod,
    numOfEscalation,
  } = data;

  const [typeOfModal, setTypeOfModal] = useState('');
  const arrOfResolution = new Array(numOfEscalation).fill(1);

  return numOfEscalation >= 3 ? (
    <div className="project">
      {typeOfModal ? (
        <ValidationStats
          typeOfModal={typeOfModal}
          setTypeOfModal={setTypeOfModal}
        />
      ) : (
        <>
          <div className="project__header">
            <div>
              <h2 className="project__header-subtitle">Project name</h2>
              <h1 className="project__header-title">{name}</h1>
            </div>
            <StageReport />
          </div>
          <div className="project__body">
            <div className="project__validation-info">
              {validationFinished && (
                <VoteInfo
                  validationFinished={validationFinished}
                  finishedTitle="Stage Report Validated!"
                  treeHeight={0}
                  growTree={randomTreeImage[1]}
                  afterTree={randomTreeImage[2]}
                  affirmed={affirmed}
                />
              )}
              <OngoingResult
                data={{ ...data }}
                affirmedText="Resolution: AFFIRMED!"
                deniedText="Resolution: DENIED"
                escalationPeriod
                setTypeOfModal={setTypeOfModal}
              />
            </div>
            <ValidationResult setTypeOfModal={setTypeOfModal} />
          </div>
        </>
      )}
    </div>
  ) : (
    <div className="project">
      <div className="project__header">
        <div>
          <h2 className="project__header-subtitle">Project name</h2>
          <h1 className="project__header-title">{name}</h1>
        </div>
        <StageReport />
      </div>
      <Resolution period="Validation" affirmed={affirmed} />
      <Resolution period="Challenge" affirmed={affirmed} />
      {arrOfResolution.map((item, id) => (
        <Resolution
          period="Escalation"
          affirmed={id % 2 !== 0 && affirmed}
          key={Date.now() + id}
        />
      ))}
      <div className="project__body">
        {validationFinished ? (
          <OngoingResult
            data={{ ...data }}
            affirmedText="Escalation SUCCESSFUL!"
            deniedText="Escalation FAILED!"
            challengePeriod
          />
        ) : (
          <Ongoing
            data={{ ...data, timeLeft }}
            stakingFinished={stakingFinished}
            setStakingFinished={setStakingFinished}
            title="Ongoing Escalation Window"
          />
        )}
        <div className="project__validation-info">
          {validationFinished && (
            <VoteInfo
              validationFinished={validationFinished}
              finishedTitle="Escalation Completed"
              treeHeight={0}
              growTree={randomTreeImage[1]}
              afterTree={randomTreeImage[2]}
              affirmed={affirmed}
            />
          )}
          <VoteForm
            data={{ ...data, timeLeft }}
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

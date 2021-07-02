/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import Ongoing from '../../components/Ongoing';
import OngoingResult from '../../components/OngoingResult/OngoingResult';
import VoteInfo from '../../components/VoteInfo';
import VoteForm from '../../components/VoteForm';
import StageReport from '../../components/StageReport/StageReport';

import greyTree1 from '../../assets/image/trees/greyTree1.svg';
import greyTree2 from '../../assets/image/trees/greyTree2.svg';
import greyTree3 from '../../assets/image/trees/greyTree3.svg';
import colorTree1 from '../../assets/image/trees/colorTree1.svg';
import colorTree2 from '../../assets/image/trees/colorTree2.svg';
import colorTree3 from '../../assets/image/trees/colorTree3.svg';
import fullTree1 from '../../assets/image/trees/fullTree1.svg';
import fullTree2 from '../../assets/image/trees/fullTree2.svg';
import fullTree3 from '../../assets/image/trees/fullTree3.svg';

const treeImages = [
  [greyTree1, colorTree1, fullTree1],
  [greyTree2, colorTree2, fullTree2],
  [greyTree3, colorTree3, fullTree3],
];
const randomTreeImage = treeImages[Math.round(Math.random() * 2)];

const ProjectValidation = () => {
  const location = useLocation();
  const { data } = location.state;
  const { name, openDate, closeDate, validFinished, affirmed } = data;

  const [timeLeft, setTimeLeft] = useState(
    Date.now() >= closeDate ? 0 : closeDate - Date.now(),
  );
  const [stakingFinished, setStakingFinished] = useState(false);
  const [validationFinished, setValidationFinished] = useState(
    validFinished || Date.now() >= closeDate,
  );

  const oneMinute = 60 * 1000;
  const sizePerMinute = 100 / ((closeDate - openDate) / oneMinute);

  const [treeHeight, setTreeHeight] = useState(
    sizePerMinute * ((closeDate - Date.now()) / oneMinute),
  );

  useEffect(() => {
    setTreeHeight(sizePerMinute * (timeLeft / oneMinute));
  }, [timeLeft]);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setTimeLeft(timeLeft - oneMinute);
    }, oneMinute);
    if (timeLeft <= 0) {
      clearTimeout(timeOut);
      setTimeLeft(0);
      setStakingFinished(false);
      setValidationFinished(true);
    }
    return () => clearTimeout(timeOut);
  });

  return (
    <div className="project">
      <div className="project__header">
        <div>
          <h2 className="project__header-subtitle">Project name</h2>
          <h1 className="project__header-title">{name}</h1>
        </div>
        <StageReport />
      </div>
      <div className="project__body">
        {validationFinished ? (
          <OngoingResult
            data={{ ...data }}
            affirmedText="Stage Report AFFIRMED"
            deniedText="Stage Report DENIED."
            validationPeriod
          />
        ) : (
          <Ongoing
            data={{ ...data, timeLeft }}
            stakingFinished={stakingFinished}
            setStakingFinished={setStakingFinished}
            showDeadline
            title="Ongoing Validation Window"
          />
        )}
        <div className="project__validation-info">
          <VoteInfo
            validationFinished={validationFinished}
            title="Voting in Progress"
            finishedTitle="Voting Completed"
            treeHeight={treeHeight}
            greyTree={randomTreeImage[0]}
            colorTree={randomTreeImage[1]}
            fullTree={randomTreeImage[2]}
          />
          <VoteForm
            data={{ ...data, timeLeft }}
            stakingFinished={stakingFinished}
            validationFinished={validationFinished}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectValidation;

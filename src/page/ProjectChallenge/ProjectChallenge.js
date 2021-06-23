/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import Ongoing from '../../components/Ongoing';
import OngoingResult from '../../components/OngoingResult/OngoingResult';
import VoteInfo from '../../components/VoteInfo';
import VoteForm from '../../components/VoteForm';
import StageReport from '../../components/StageReport/StageReport';
import StageStatus from './component/StageStatus/StageStatus';

import fullTree1 from '../../assets/image/trees/fullTree1.svg';
import fullTree2 from '../../assets/image/trees/fullTree2.svg';
import fullTree3 from '../../assets/image/trees/fullTree3.svg';
import grownTree1 from '../../assets/image/trees/grownTree1.svg';
import grownTree2 from '../../assets/image/trees/grownTree2.svg';
import grownTree3 from '../../assets/image/trees/grownTree3.svg';
import afterTree1 from '../../assets/image/trees/afterTree1.svg';
import afterTree2 from '../../assets/image/trees/afterTree2.svg';
import afterTree3 from '../../assets/image/trees/afterTree3.svg';
import ProjectEscalation from './component/ProjectEscalation';

const treeImages = [
  [fullTree1, grownTree1, afterTree1],
  [fullTree2, grownTree2, afterTree2],
  [fullTree3, grownTree3, afterTree3],
];
const randomTreeImage = treeImages[Math.round(Math.random() * 2)];

const ProjectChallenge = () => {
  const location = useLocation();
  const { data: prevData } = location.state;

  // In Challenge Window open date is the end date of Validation Window
  // Challenge Window last 7 days
  const oneMinute = 60 * 1000;
  const oneDay = 1000 * 60 * 60 * 24;
  const oneWeek = 7 * 24 * 60 * 60 * 1000;

  const { closeDate: prevCloseDate } = prevData;
  const firstValidationCloseDate = prevCloseDate;

  const [startDate, setStartDate] = useState(prevCloseDate);
  const [showPeriod, setShowPeriod] = useState(false);
  const [endDate, setEndDate] = useState(startDate + oneWeek);

  const data = { ...prevData, openDate: startDate, closeDate: endDate };
  const {
    name,
    openDate,
    closeDate,
    validFinished: prevValidationFinished,
    affirmed,
  } = data;

  if (!prevValidationFinished)
    return <span>Validation Period is not Finished</span>;

  const [timeLeft, setTimeLeft] = useState(
    Date.now() >= closeDate ? 0 : closeDate - Date.now(),
  );
  const [stakingFinished, setStakingFinished] = useState(false);
  const [validationFinished, setValidationFinished] = useState(
    Date.now() >= closeDate,
  );
  const [escalationPeriod, setEscalationPeriod] = useState(false);
  const [numOfEscalation, setNumOfEscalation] = useState(0);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setTimeLeft(timeLeft - oneMinute);
    }, oneMinute);
    if (timeLeft <= 0) {
      clearTimeout(timeOut);
      setTimeLeft(0);
      setStakingFinished(false);
      setValidationFinished(true);
      if (escalationPeriod) {
        const daysGoneFromChallenge = Math.floor(
          (Date.now() - firstValidationCloseDate - oneWeek) / oneDay,
        );
        const pastEscalations = Math.floor(daysGoneFromChallenge / 7);
        setNumOfEscalation(pastEscalations);
        if (pastEscalations < 3) {
          setStartDate(endDate);
          setEndDate(endDate + oneWeek);
          setTimeLeft(endDate + oneWeek - Date.now());
          setValidationFinished(false);
          setShowPeriod(true);
        } else {
          setValidationFinished(true);
          setShowPeriod(true);
        }
      }
    }
  });

  return showPeriod ? (
    <ProjectEscalation
      data={{
        ...data,
        timeLeft,
        validationFinished,
        stakingFinished,
        setStakingFinished,
        escalationPeriod,
        numOfEscalation,
      }}
    />
  ) : (
    <div className="project">
      <div className="project__header">
        <div>
          <h2 className="project__header-subtitle">Project name</h2>
          <h1 className="project__header-title">{name}</h1>
        </div>
        <StageReport />
      </div>
      {!validationFinished && <StageStatus affirmed={affirmed} />}
      <div className="project__body">
        {validationFinished ? (
          <OngoingResult
            data={{ ...data }}
            affirmedText="Challenge SUCCESSFUL!"
            deniedText="Challenge FAILED!"
            challengePeriod
          />
        ) : (
          <Ongoing
            data={{ ...data, timeLeft }}
            stakingFinished={stakingFinished}
            setStakingFinished={setStakingFinished}
            title="Ongoing Challenge Window"
          />
        )}
        <div className="project__validation-info">
          {validationFinished && (
            <VoteInfo
              validationFinished={validationFinished}
              finishedTitle="Challenge Completed"
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
            setEscalationPeriod={setEscalationPeriod}
            challengePeriod
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectChallenge;

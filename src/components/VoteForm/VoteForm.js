/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Step1Wrapper from './components/Step1Wrapper';
import Step2Wrapper from './components/Step2Wrapper';
import Step3Wrapper from './components/Step3Wrapper';

const VoteForm = ({
  data,
  stakingFinished,
  setStakingFinished,
  validationFinished,
  challengePeriod,
  escalationPeriod,
  setEscalationPeriod,
}) => {
  const { closeDate, openDate, timeLeft } = data;

  const [numOfOPP, setNumOfOPP] = useState();
  const [voteResult, setVoteResult] = useState();
  const [step, setStep] = useState(1);
  const [isRevoked, setIsRevoked] = useState(false);
  const [isActiveAlert, setIsActiveAlert] = useState(false);

  if (stakingFinished && step !== 2) {
    if (voteResult === true || voteResult === false) {
      setStep(2);
    }
  }

  if (validationFinished && step !== 3) {
    setStep(3);
  }

  const affirmDataUpload = () => {
    if (+numOfOPP > 0) {
      setIsActiveAlert(false);
      setVoteResult(true);
      setStep((prev) => prev + 1);
    } else {
      setIsActiveAlert(true);
    }
  };

  const denyDataUpload = () => {
    if (+numOfOPP > 0) {
      setIsActiveAlert(false);
      setVoteResult(false);
      setStep((prev) => prev + 1);
    } else {
      setIsActiveAlert(true);
    }
  };

  const changeVote = () => {
    setIsRevoked(false);
    setStep((prev) => prev - 1);
  };

  const revokeVote = () => {
    setIsRevoked(true);
  };

  const submitVote = () => {
    if (+numOfOPP > 0) {
      setIsActiveAlert(false);
      setStep((prev) => prev + 1);
    } else {
      setIsActiveAlert(true);
    }
  };

  const confirmVote = () => {
    setStakingFinished(true);
  };

  const cancelVote = () => {
    setStep((prev) => prev - 1);
  };

  return (
    <div
      className={`project__validate ${
        challengePeriod ? 'project__challenge' : ''
      }`}
    >
      {step === 1 && (
        <Step1Wrapper
          data={{
            isActiveAlert,
            challengePeriod,
            numOfOPP,
            setNumOfOPP,
            submitVote,
            affirmDataUpload,
            stakingFinished,
            denyDataUpload,
            escalationPeriod,
          }}
        />
      )}
      {step === 2 && (
        <Step2Wrapper
          data={{
            ...data,
            challengePeriod,
            numOfOPP,
            stakingFinished,
            confirmVote,
            cancelVote,
            isRevoked,
            voteResult,
            changeVote,
            revokeVote,
            timeLeft,
          }}
        />
      )}
      {step === 3 && (
        <Step3Wrapper
          data={{
            ...data,
            numOfOPP,
            challengePeriod,
            escalationPeriod,
            setEscalationPeriod,
          }}
        />
      )}
    </div>
  );
};

VoteForm.propTypes = {
  data: PropTypes.object,
  stakingFinished: PropTypes.bool,
  setStakingFinished: PropTypes.func,
  validationFinished: PropTypes.bool,
  challengePeriod: PropTypes.bool,
  escalationPeriod: PropTypes.bool,
  setEscalationPeriod: PropTypes.func,
};

export default VoteForm;

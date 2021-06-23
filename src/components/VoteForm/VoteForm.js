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

  const [numOfORP, setNumOfORP] = useState();
  const [voteResult, setVoteResult] = useState();
  const [step, setStep] = useState(1);
  const [isRevoked, setIsRevoked] = useState(false);

  if (stakingFinished && step !== 2) {
    setStep(2);
  }

  if (validationFinished && step !== 3) {
    setStep(3);
  }

  const affirmDataUpload = () => {
    if (+numOfORP > 0) {
      setVoteResult(true);
      setStep((prev) => prev + 1);
    }
  };

  const denyDataUpload = () => {
    if (+numOfORP > 0) {
      setVoteResult(false);
      setStep((prev) => prev + 1);
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
    setStep((prev) => prev + 1);
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
            challengePeriod,
            numOfORP,
            setNumOfORP,
            submitVote,
            affirmDataUpload,
            stakingFinished,
            denyDataUpload,
          }}
        />
      )}
      {step === 2 && (
        <Step2Wrapper
          data={{
            challengePeriod,
            numOfORP,
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
            numOfORP,
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

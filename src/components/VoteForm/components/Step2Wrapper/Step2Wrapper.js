import React from 'react';
import PropTypes from 'prop-types';
import ChallengeStep2 from '../ChallengeStep2';
import ValidationStep2 from '../ValidationStep2';

const Step2Wrapper = ({ data }) => {
  const {
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
    voteAgain,
    lastActivePeriod,
    userVoteApproved,
  } = data;
  return (
    <>
      {challengePeriod ? (
        <ChallengeStep2
          data={{
            ...data,
            stakingFinished,
            confirmVote,
            cancelVote,
            numOfOPP,
            lastActivePeriod,
            changeVote,
            userVoteApproved,
          }}
        />
      ) : (
        <ValidationStep2
          data={{
            isRevoked,
            numOfOPP,
            voteResult,
            stakingFinished,
            changeVote,
            revokeVote,
            timeLeft,
            voteAgain,
            userVoteApproved,
          }}
        />
      )}
    </>
  );
};

Step2Wrapper.propTypes = {
  data: PropTypes.object,
};

export default Step2Wrapper;

import React from 'react';
import PropTypes from 'prop-types';
import ChallengeStep1 from '../ChallengeStep1';
import ValidationStep1 from '../ValidationStep1';

const Step1Wrapper = ({ data }) => {
  const {
    isActiveAlert,
    challengePeriod,
    numOfOPP,
    setNumOfOPP,
    submitVote,
    affirmDataUpload,
    stakingFinished,
    denyDataUpload,
    escalationPeriod,
  } = data;
  return (
    <>
      {challengePeriod ? (
        <ChallengeStep1
          data={{
            isActiveAlert,
            numOfOPP,
            setNumOfOPP,
            submitVote,
            escalationPeriod,
          }}
        />
      ) : (
        <ValidationStep1
          data={{
            isActiveAlert,
            numOfOPP,
            setNumOfOPP,
            affirmDataUpload,
            stakingFinished,
            denyDataUpload,
          }}
        />
      )}
    </>
  );
};

Step1Wrapper.propTypes = {
  data: PropTypes.object,
};

export default Step1Wrapper;

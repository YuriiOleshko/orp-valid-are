import React from 'react';
import PropTypes from 'prop-types';
import ChallengeStep1 from '../ChallengeStep1';
import ValidationStep1 from '../ValidationStep1';

const Step1Wrapper = ({ data }) => {
  const {
    challengePeriod,
    numOfORP,
    setNumOfORP,
    submitVote,
    affirmDataUpload,
    stakingFinished,
    denyDataUpload,
  } = data;
  return (
    <>
      {challengePeriod ? (
        <ChallengeStep1 data={{ numOfORP, setNumOfORP, submitVote }} />
      ) : (
        <ValidationStep1
          data={{
            numOfORP,
            setNumOfORP,
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

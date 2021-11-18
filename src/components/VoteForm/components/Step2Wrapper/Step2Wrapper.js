import React from 'react';
import PropTypes from 'prop-types';
import ChallengeStep2 from '../ChallengeStep2';
import ValidationStep2 from '../ValidationStep2';

const Step2Wrapper = ({ data }) => {
  const { challengePeriod } = data;
  return (
    <>
      {challengePeriod ? (
        <ChallengeStep2 data={data} />
      ) : (
        <ValidationStep2 data={data} />
      )}
    </>
  );
};

Step2Wrapper.propTypes = {
  data: PropTypes.object,
};

export default Step2Wrapper;

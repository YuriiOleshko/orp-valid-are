import React from 'react';
import PropTypes from 'prop-types';
import ChallengeStep1 from '../ChallengeStep1';
import ValidationStep1 from '../ValidationStep1';

const Step1Wrapper = ({ data }) => {
  const { challengePeriod } = data;
  return (
    <>
      {challengePeriod ? (
        <ChallengeStep1 data={data} />
      ) : (
        <ValidationStep1 data={data} />
      )}
    </>
  );
};

Step1Wrapper.propTypes = {
  data: PropTypes.object,
};

export default Step1Wrapper;

import React from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import ValidationStep3 from '../ValidationStep3';

const Step3Wrapper = ({ data }) => {
  const {
    challengePeriod,
    numOfORP,
    escalationPeriod,
    setEscalationPeriod,
    name,
  } = data;
  const history = useHistory();
  return (
    <>
      {challengePeriod ? (
        <ValidationStep3
          data={{ ...data, numOfORP, setEscalationPeriod, escalationPeriod }}
          titleSuccess="Your challenge is SUCCESSFUL!"
          titleFail="Unfortunately, your challenge FAILED!"
          buttonText="Go To Escalation"
          clickHandler={() => setEscalationPeriod(true)}
        />
      ) : (
        <ValidationStep3
          data={{ ...data, numOfORP, setEscalationPeriod }}
          titleSuccess="You have AFFIRMED this Stage Upload!"
          titleFail="Unfortunately, you voted to DENY this Stage Upload!"
          buttonText="Go To Challenge"
          clickHandler={() =>
            history.push({
              pathname: `/project/challenge/${name}`,
              state: { data },
            })
          }
        />
      )}
    </>
  );
};

Step3Wrapper.propTypes = {
  data: PropTypes.object,
};

export default Step3Wrapper;

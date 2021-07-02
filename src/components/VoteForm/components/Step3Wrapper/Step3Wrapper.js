import React from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import ValidationStep3 from '../ValidationStep3';

const Step3Wrapper = ({ data }) => {
  const {
    challengePeriod,
    numOfOPP,
    escalationPeriod,
    setEscalationPeriod,
    name,
    validationVote,
    challengeVote,
  } = data;
  const history = useHistory();
  return (
    <>
      {challengePeriod ? (
        <ValidationStep3
          data={{ ...data, numOfOPP, setEscalationPeriod, escalationPeriod }}
          titleSuccess="Your challenge is SUCCESSFUL!"
          titleFail="Your challenge FAILED!"
          buttonText="Go To Escalation"
          clickHandler={() => setEscalationPeriod(true)}
          vote={challengeVote}
          challengePeriod
        />
      ) : (
        <ValidationStep3
          data={{ ...data, numOfOPP, setEscalationPeriod }}
          titleSuccess="You have AFFIRMED this Stage Upload!"
          titleFail="You voted to DENY this Stage Upload!"
          buttonText="Go To Challenge"
          clickHandler={() =>
            history.push({
              pathname: `/project/challenge/${name}`,
              state: { data },
            })
          }
          vote={validationVote}
        />
      )}
    </>
  );
};

Step3Wrapper.propTypes = {
  data: PropTypes.object,
};

export default Step3Wrapper;

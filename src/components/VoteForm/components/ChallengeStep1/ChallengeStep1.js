import React from 'react';
import PropTypes from 'prop-types';
import attention from '../../../../assets/image/attention.svg';
import CustomInput from '../../../generic/CustomInput';
import CustomBtn from '../../../generic/CustomBtn';

const ChallengeStep1 = ({ data }) => {
  const { isActiveAlert, numOfOPP, setNumOfOPP, submitVote, escalationPeriod } =
    data;
  return (
    <div className="project__validate-wrapper project__challenge-wrapper">
      <div className="project__challenge-title">
        <div className="project__challenge-attention">
          <img src={attention} alt="Attention" />
        </div>
        <span className="project__challenge-text">
          <b>
            You can{' '}
            {escalationPeriod
              ? 'escalate another challenge'
              : 'challenge the Validation'}{' '}
            resolution in case you believe it’s incorrect.
          </b>{' '}
          The Challenge wins and the resolution changes to opposite in case the
          total Challenge stake surpasses the original Validation stake.
        </span>
      </div>
      <div className="project__challenge-form">
        <CustomInput
          labelText="Amount"
          classInput="project__validate-input"
          classLabel="project__validate-label"
          backgroundText="OPN"
          backgroundTextClass="project__validate-back"
          change={setNumOfOPP}
          value={numOfOPP}
          warningMessage={isActiveAlert && 'Enter amount of OPN!'}
        />
        <CustomBtn
          label="Submit Vote"
          handleClick={submitVote}
          customClass="btn__submit-vote"
        />
      </div>
    </div>
  );
};

ChallengeStep1.propTypes = {
  data: PropTypes.object,
};

export default ChallengeStep1;

import React from 'react';
import PropTypes from 'prop-types';

import CustomBtn from '../../../generic/CustomBtn';

function ChallengeStep2({ data }) {
  const { stakingFinished, confirmVote, cancelVote, affirmed, numOfOPP } = data;
  return stakingFinished ? (
    <div className="vote_form">
      <div className="vote_form__info">
        <div className="vote_form__text-wrapper">
          <span className="vote_form__text">
            Your Challenge vote successfully submitted!
          </span>
          <span className="vote_form__text">
            <b>
              {numOfOPP} OPP against Stage Report{' '}
              {affirmed ? 'AFFIRMED' : 'DENIED'}
            </b>
          </span>
        </div>
        <div className="vote__select vote__norevoke">
          <span>
            Your decision is final and non-revokable for this validation window.
          </span>
        </div>
      </div>
    </div>
  ) : (
    <div className="vote_form">
      <div className="vote_form__info">
        <div className="vote_form__text-wrapper">
          <span className="vote_form__text">
            <b>You can’t revoke a Challenge vote!</b>
          </span>
          <span className="vote_form__text">
            Your stake will remain locked until the Data Upload validation is
            completed! {numOfOPP} OPP against Stage Report{' '}
            {affirmed ? 'AFFIRMED' : 'DENIED'}.
          </span>
          <span className="vote_form__text">
            <b>Are you sure you want to continue?</b>
          </span>
        </div>
        <div className="vote__select">
          <CustomBtn
            label="Confirm Vote"
            customClass="vote__select__btn confirm"
            handleClick={confirmVote}
          />
          <CustomBtn
            label="Cancel"
            customClass="vote__select__btn cancel"
            handleClick={cancelVote}
          />
        </div>
      </div>
    </div>
  );
}

ChallengeStep2.propTypes = {
  data: PropTypes.object,
};

export default ChallengeStep2;

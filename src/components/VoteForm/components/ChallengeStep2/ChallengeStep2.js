import React from 'react';
import PropTypes from 'prop-types';

import CustomBtn from '../../../generic/CustomBtn';

function ChallengeStep2({ data }) {
  const {
    stakingFinished,
    confirmVote,
    cancelVote,
    payForVote,
    // voteResult,
    numOfOPP,
    userVoteApproved,
    lastActivePeriod,
  } = data;
  // const prevVote =
  //   lastActivePeriod.affirm_stake - lastActivePeriod.deny_stake > 0;
  const prevVote = lastActivePeriod.prev_vote;
  return stakingFinished ? (
    <div className="vote_form">
      <div className="vote_form__info">
        <div className="vote_form__text-wrapper">
          <span className="vote_form__text">
            Your Challenge vote successfully submitted!
          </span>
          <span className="vote_form__text">
            <b>
              {numOfOPP} OPN against Stage Report{' '}
              {prevVote ? 'AFFIRMED' : 'DENIED'}
            </b>
          </span>
        </div>
        {!userVoteApproved && (
          <CustomBtn
            label="Confirm"
            handleClick={payForVote}
            customClass="btn__load"
          />
        )}
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
            completed! {numOfOPP} OPN against Stage Report{' '}
            {prevVote ? 'AFFIRMED' : 'DENIED'}.
          </span>
          <span className="vote_form__text">
            <b>Are you sure you want to continue?</b>
          </span>
        </div>
        <div className="vote__select">
          <CustomBtn
            label="Confirm Vote"
            customClass="vote__select__btn confirm"
            handleClick={() => confirmVote(!prevVote)}
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

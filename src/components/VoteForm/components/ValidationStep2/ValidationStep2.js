import React from 'react';
import PropTypes from 'prop-types';
import CustomBtn from '../../../generic/CustomBtn';
import DigitCountdown from '../../../../page/ProjectValidation/components/DigitCountdown';

const ValidationStep2 = ({ data }) => {
  const {
    isRevoked,
    numOfOPP,
    voteResult,
    stakingFinished,
    changeVote,
    revokeVote,
    timeLeft,
    voteAgain,
    userVoteApproved,
  } = data;
  return (
    <div className="project__validate-wrapper wrapper-step2">
      <h2 className="project__validate-title title-step2">
        {isRevoked ? (
          <>
            <span>Your vote successfully revoked!</span>
            <p>
              <b>
                {+numOfOPP} OPN stake has been unlocked and returned to your
                balance!
              </b>
            </p>
          </>
        ) : (
          <>
            <span>Your vote successfully submited!</span>
            <p>
              <b>
                {+numOfOPP || 100} OPN – Data Upload{' '}
                {voteResult ? 'AFFIRMED' : 'DENIED'}
              </b>
            </p>
          </>
        )}
      </h2>
      {stakingFinished ? (
        <>
          {!userVoteApproved && (
            <CustomBtn
              label="Confirm Vote"
              handleClick={changeVote}
              customClass="btn__load"
            />
          )}
          <div className="project__validate-norevoke">
            <span>
              Your decision is final and non-revokable for this validation
              window.
            </span>
          </div>
        </>
      ) : (
        <>
          <div className="project__validate-buttons buttons-step2">
            {isRevoked ? (
              <CustomBtn
                label="Vote Again"
                handleClick={voteAgain}
                customClass="btn__load btn-step2"
              />
            ) : (
              <>
                {!userVoteApproved && (
                  <CustomBtn
                    label="Confirm Vote"
                    handleClick={changeVote}
                    customClass="btn__load"
                  />
                )}
                <CustomBtn
                  label="Revoke Vote"
                  handleClick={revokeVote}
                  customClass="btn__load"
                />
              </>
            )}
          </div>
          <DigitCountdown timeLeft={timeLeft} />
        </>
      )}
    </div>
  );
};

ValidationStep2.propTypes = {
  data: PropTypes.object,
};

export default ValidationStep2;

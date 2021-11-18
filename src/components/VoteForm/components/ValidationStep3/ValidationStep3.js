import React from 'react';
import PropTypes from 'prop-types';
import CustomBtn from '../../../generic/CustomBtn';

const ValidationStep3 = ({
  data,
  titleSuccess,
  titleFail,
  buttonText,
  clickHandler,
  vote,
  challengePeriod,
}) => {
  const { voteResult, numOfOPP, escalationPeriod } = data;
  return (
    <div
      className={`project__validate-wrapper wrapper-step2 ${
        escalationPeriod && 'project__ecalation-wrapper'
      }`}
    >
      <h2 className="project__validate-title title-step2">
        {typeof voteResult === 'boolean' && (
          <>
            {voteResult === vote ? (
              <>
                <span>Congratulations!</span>
                <p>
                  {challengePeriod && titleSuccess}
                  {!challengePeriod && (voteResult ? titleSuccess : titleFail)}
                </p>
              </>
            ) : (
              <span>
                {challengePeriod && `Unfortunately, ${titleFail}`}
                {!challengePeriod &&
                  `Unfortunately, ${voteResult ? titleSuccess : titleFail}`}
              </span>
            )}
          </>
        )}
      </h2>
      <span className="project__validate-result">
        {voteResult === vote ? (
          <>
            Your vote stake {+numOfOPP} OPN will remain locked until stage
            resolution is confirmed.
          </>
        ) : (
          <>
            {typeof voteResult === 'boolean' ? (
              <>
                {' '}
                Your {+numOfOPP} OPN stake has been unlocked and returned to
                your balance!
              </>
            ) : (
              <>Unfortunately, you haven&apos;t voted.</>
            )}
          </>
        )}
      </span>
      {!escalationPeriod && (
        <div className="project__validate-buttons buttons-step2">
          <CustomBtn
            label={buttonText}
            handleClick={clickHandler}
            customClass="btn__load btn-step2"
          />
        </div>
      )}
    </div>
  );
};

ValidationStep3.propTypes = {
  data: PropTypes.object,
  titleSuccess: PropTypes.string,
  titleFail: PropTypes.string,
  buttonText: PropTypes.string,
  clickHandler: PropTypes.func,
  vote: PropTypes.bool,
  challengePeriod: PropTypes.bool,
};

export default ValidationStep3;

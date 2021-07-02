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
  const { affirmed, numOfOPP, escalationPeriod } = data;
  return (
    <div
      className={`project__validate-wrapper wrapper-step2 ${
        escalationPeriod && 'project__ecalation-wrapper'
      }`}
    >
      <h2 className="project__validate-title title-step2">
        {affirmed === vote ? (
          <>
            <span>Congratulations!</span>
            <p>
              {challengePeriod && titleSuccess}
              {!challengePeriod && (vote ? titleSuccess : titleFail)}
            </p>
          </>
        ) : (
          <span>
            {challengePeriod && `Unfortunately, ${titleFail}`}
            {!challengePeriod &&
              `Unfortunately, ${vote ? titleSuccess : titleFail}`}
          </span>
        )}
      </h2>
      <span className="project__validate-result">
        {affirmed === vote ? (
          <>
            Your vote stake {+numOfOPP || 100} OPP will remain locked until
            stage resolution is confirmed.
          </>
        ) : (
          <>
            Your {+numOfOPP || 100} OPP stake has been unlocked and returned to
            your balance!
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

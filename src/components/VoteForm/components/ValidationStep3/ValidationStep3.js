import React from 'react';
import PropTypes from 'prop-types';
import CustomBtn from '../../../generic/CustomBtn';

const ValidationStep3 = ({
  data,
  titleSuccess,
  titleFail,
  buttonText,
  clickHandler,
}) => {
  const { affirmed, numOfORP, escalationPeriod } = data;
  return (
    <div
      className={`project__validate-wrapper wrapper-step2 ${
        escalationPeriod && 'project__ecalation-wrapper'
      }`}
    >
      <h2 className="project__validate-title title-step2">
        {affirmed ? (
          <>
            <span>Congratulations!</span>
            <p>{titleSuccess}</p>
          </>
        ) : (
          <span>{titleFail}</span>
        )}
      </h2>
      <span className="project__validate-result">
        {affirmed ? (
          <>
            Your vote stake {+numOfORP || 100} ORP will remain locked until
            stage resolution is confirmed.
          </>
        ) : (
          <>
            Your {+numOfORP || 100} ORP stake has been unlocked and returned to
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
};

export default ValidationStep3;

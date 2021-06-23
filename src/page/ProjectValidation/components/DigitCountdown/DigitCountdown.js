import React from 'react';
import PropTypes from 'prop-types';
import { getTimerInHours } from '../../../../utils/convert-utils';

const DigitCountdown = ({ timeLeft }) => (
  <span className="timer-step2">
    Vote fix in: <b>{getTimerInHours(timeLeft - 7 * 24 * 60 * 60 * 1000)}</b>
  </span>
);

DigitCountdown.propTypes = {
  timeLeft: PropTypes.number,
};

export default DigitCountdown;

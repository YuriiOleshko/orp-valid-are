/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import ReactTooltip from 'react-tooltip';
import {
  convertDateToHours,
  formattedDate,
  getTimer,
} from '../../../../utils/convert-utils';

const Countdown = ({
  data,
  stakingFinished,
  setStakingFinished,
  showDeadline,
}) => {
  const intl = useIntl();
  const { openDate, closeDate, timeLeft } = data;
  let fixWidth;
  let fixDate;

  const oneMinute = 60 * 1000;
  const oneWeek = 7 * 24 * 60 * 60 * 1000;
  const minutesInWeek = 7 * 24 * 60;
  const sizePerMinute = 100 / ((closeDate - openDate) / oneMinute);

  if (showDeadline) {
    fixWidth = sizePerMinute * minutesInWeek;
    fixDate = closeDate - oneWeek;
  }

  const [countdownWidth, setCountdownWidth] = useState(
    sizePerMinute * (timeLeft / oneMinute),
  );

  const timerTime = getTimer(timeLeft);

  useEffect(() => {
    if (showDeadline && countdownWidth <= fixWidth) {
      setStakingFinished(true);
      setCountdownWidth(fixWidth);
    } else {
      setCountdownWidth(sizePerMinute * (timeLeft / oneMinute));
    }
  }, [timeLeft]);

  return (
    <div className="project__ongoing-countdown">
      <div className="countdown" style={{ flexBasis: `${countdownWidth}%` }}>
        <div
          className={
            countdownWidth <= 17
              ? 'countdown-wrapper countdown-wrapper-fix'
              : 'countdown-wrapper'
          }
        >
          <span className="countdown-title">Time left</span>
          <div className="countdown-value">{timerTime}</div>
        </div>
      </div>
      {showDeadline && (
        <div className="fix" style={{ width: `${fixWidth}%` }}>
          {stakingFinished && <span className="fix-text">Vote Fix</span>}
          <div className="fix-tooltip">
            {/* eslint-disable jsx-a11y/anchor-is-valid */}
            <a data-tip data-for="vote-fix">
              <i className="icon-question" />
            </a>
            <ReactTooltip
              id="vote-fix"
              type="light"
              effect="solid"
              className="fix-tooltip-message"
            >
              <span>
                You will not be able to change or revoke your vote at this
                point. Your validation stake will be locked until the window
                closes.
              </span>
            </ReactTooltip>
            <div className="fix-time">
              <span>
                <b>VOTE FIX</b>
              </span>
              <span>
                {formattedDate(fixDate, '.')} {convertDateToHours(fixDate, ':')}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

Countdown.propTypes = {
  data: PropTypes.object,
  stakingFinished: PropTypes.bool,
  setStakingFinished: PropTypes.func,
  showDeadline: PropTypes.bool,
};

export default Countdown;

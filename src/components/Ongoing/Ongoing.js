/* eslint-disable no-unused-vars */
import React from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import Countdown from '../../page/ProjectValidation/components/Countdown/Countdown';
import { convertDateToHours, formattedDate } from '../../utils/convert-utils';

const Ongoing = ({
  data,
  stakingFinished,
  setStakingFinished,
  showDeadline,
  title,
}) => {
  const intl = useIntl();
  const { openDate, closeDate, timeLeft, lockTime } = data;

  return (
    <div className="project__ongoing">
      <h2 className="project__ongoing-title">{title}</h2>
      <Countdown
        data={{ closeDate, openDate, timeLeft, lockTime }}
        stakingFinished={stakingFinished}
        setStakingFinished={setStakingFinished}
        showDeadline={showDeadline}
      />
      <div className="project__ongoing-time">
        <span>
          <b>Opened</b> {formattedDate(openDate, '.')}{' '}
          {convertDateToHours(closeDate, ':')}
        </span>
        <span>
          <b>Closed</b> {formattedDate(closeDate, '.')}{' '}
          {convertDateToHours(closeDate, ':')}
        </span>
      </div>
    </div>
  );
};

Ongoing.propTypes = {
  data: PropTypes.object,
  stakingFinished: PropTypes.bool,
  setStakingFinished: PropTypes.func,
  showDeadline: PropTypes.bool,
  title: PropTypes.string,
};

export default Ongoing;

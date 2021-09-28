/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import CustomBtn from '../generic/CustomBtn';
import { convertDateToHours, formattedDate } from '../../utils/convert-utils';

const OngoingResult = ({
  data,
  affirmedText,
  deniedText,
  validationPeriod,
  challengePeriod,
  escalationPeriod,
  setTypeOfModal,
}) => {
  const { openDate, closeDate, affirmed, periodResult } = data;

  const ongoigStyle = `project__ongoing ${
    affirmed ? 'project__ongoing-affirmed' : 'project__ongoing-denied'
  } ${escalationPeriod ? 'project__ongoing-escalation' : ''}`;

  return (
    <div className={ongoigStyle}>
      <div className="project__ongoing-result">
        <div className="project__ongoing-icon">
          {affirmed ? (
            <i className="icon-success" />
          ) : (
            <i className="icon-fail" />
          )}
        </div>
        <div className="project__ongoing-result-text">
          <span className="project__ongoing-result-title">
            {affirmed ? affirmedText : deniedText}
          </span>
          {validationPeriod && (
            <>
              <span className="project__ongoing-result-info">
                {periodResult.affirm_number + periodResult.deny_number}{' '}
                Validators Voted
              </span>
              <span className="project__ongoing-result-time">
                <span>
                  <b>Open</b> {formattedDate(openDate, '.')}{' '}
                  {convertDateToHours(closeDate, ':')}
                </span>
                <span>
                  <b>Close</b> {formattedDate(closeDate, '.')}{' '}
                  {convertDateToHours(closeDate, ':')}
                </span>
              </span>
            </>
          )}
          {challengePeriod && (
            <>
              <span className="project__ongoing-result-message">
                {`Validation resolution stake ${
                  affirmed ? 'has' : 'has not'
                } been surpassed`}
              </span>
              <span className="project__ongoing-result-message">
                <b>13 Validators Voted</b>
              </span>
            </>
          )}
          {escalationPeriod && (
            <CustomBtn
              customClass="btn__escalation"
              label="View Validation Stats"
              handleClick={() => setTypeOfModal('general')}
            />
          )}
        </div>
      </div>
    </div>
  );
};

OngoingResult.propTypes = {
  data: PropTypes.object,
  affirmedText: PropTypes.string,
  deniedText: PropTypes.string,
  validationPeriod: PropTypes.bool,
  challengePeriod: PropTypes.bool,
  escalationPeriod: PropTypes.bool,
  setTypeOfModal: PropTypes.func,
};

export default OngoingResult;

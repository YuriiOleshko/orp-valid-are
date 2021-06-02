import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';

import 'react-datepicker/dist/react-datepicker.css';

import { formattedDate } from '../../utils/convert-utils';

const CustomDatePicker = ({ labelText }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const onChange = (dates) => {
    // eslint-disable-next-line
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  return (
    <div className="date-wrapper">
      <span className="date-header">{labelText}</span>
      <DatePicker
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        shouldCloseOnSelect={false}
        customInput={
          <div className="date-body">
            <div className="date-values">
              {startDate && endDate ? (
                <>
                  <span className="date-start">
                    {formattedDate(startDate, '.')}
                  </span>
                  <span className="date-end">
                    {formattedDate(endDate, '.')}
                  </span>
                </>
              ) : (
                <span className="date-placeholder date-all-time">All time</span>
              )}
            </div>
            <div className="date-select">
              <i className="icon-arrow" />
            </div>
          </div>
        }
      />
    </div>
  );
};

CustomDatePicker.propTypes = {
  labelText: PropTypes.string,
};

export default CustomDatePicker;

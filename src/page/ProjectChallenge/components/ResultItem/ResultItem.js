/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import CustomBtn from '../../../../components/generic/CustomBtn';

const ResultItem = ({
  affirmed,
  affirmVotes,
  denyVotes,
  period,
  typeOfModal,
  setTypeOfModal,
}) => (
  <div className="project__validation-result__item">
    <div className="project__validation-result__icon">
      <i className={affirmed ? 'icon-success' : 'icon-close'} />
    </div>
    <div className="project__validation-result__content">
      <span className="project__validation-result__content-text">
        {period} resolution: Stage Report
        <span
          className={`project__validation-result__content-text-${
            affirmed ? 'affirmed' : 'denied'
          }`}
        >
          {affirmed ? ' AFFIRMED' : ' DENIED'}
        </span>
        . {affirmVotes} votes AFFIRM, {denyVotes} votes DENY
      </span>
    </div>
    <div className="project__validation-result__more">
      <CustomBtn
        label="View data"
        customClass="project__validation-result__more-info"
        handleClick={() => setTypeOfModal(typeOfModal)}
      />
    </div>
  </div>
);

ResultItem.propTypes = {
  affirmed: PropTypes.bool,
  period: PropTypes.string,
  typeOfModal: PropTypes.string,
  setTypeOfModal: PropTypes.func,
};

export default ResultItem;

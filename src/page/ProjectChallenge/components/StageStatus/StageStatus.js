import React from 'react';
import PropTypes from 'prop-types';

function StageStatus({ affirmed }) {
  function statusValue() {
    switch (affirmed) {
      case true:
        return {
          text: 'AFFIRMED',
          class: 'affirmed',
        };
      case false:
        return {
          text: 'DENIED',
          class: 'denied',
        };
      default: {
        return {
          text: 'UNKNOWN',
          class: 'denied',
        };
      }
    }
  }

  return (
    <div className={`project__status ${statusValue().class}`}>
      <span className="project__status__text">
        Validation resolution: Stage Report {statusValue().text} Your Validation
        stake: 120 OPP
      </span>
    </div>
  );
}

StageStatus.propTypes = {
  affirmed: PropTypes.bool,
};

export default StageStatus;

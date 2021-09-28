/* eslint-disable react/prop-types */
import React from 'react';

function StageStatus({ approve, stake }) {
  function statusValue() {
    switch (approve) {
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
        stake: {stake} OPP
      </span>
    </div>
  );
}

export default StageStatus;

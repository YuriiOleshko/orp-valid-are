/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import React from 'react';

function StageStatus({ prevVote, stake }) {
  // const prevVote =
  //   lastActivePeriod.affirm_stake - lastActivePeriod.deny_stake > 0;
  function statusValue() {
    switch (prevVote) {
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
        stake: {stake} OPN
      </span>
    </div>
  );
}

export default StageStatus;

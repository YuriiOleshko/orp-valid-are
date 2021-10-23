/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import ResultItem from '../ResultItem';

function ValidationResult({ setTypeOfModal, pastPeriods }) {
  // console.log(pastPeriods);
  return (
    <div className="project__validation-result">
      <h3 className="project__validation-result__heading">
        Validation Results
      </h3>
      {pastPeriods.map((item, index) => {
        if (pastPeriods.length !== 5 && index === pastPeriods.length - 1) {
          return null;
        }
        return (
          <ResultItem
            affirmed={pastPeriods[index + 1]?.prev_vote}
            period={
              index === 0
                ? 'Validation'
                : index === 1
                ? 'Challenge'
                : 'Escalation'
            }
            typeOfModal={
              index === 0
                ? 'validation'
                : index === 1
                ? 'challenge'
                : `escalation${index + 1}`
            }
            setTypeOfModal={setTypeOfModal}
            affirmVotes={item.affirm_number}
            denyVotes={item.deny_number}
          />
        );
      })}
    </div>
  );
}

ValidationResult.propTypes = {
  setTypeOfModal: PropTypes.func,
};

export default ValidationResult;

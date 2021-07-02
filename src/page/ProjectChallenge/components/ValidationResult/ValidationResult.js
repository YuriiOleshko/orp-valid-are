import React from 'react';
import PropTypes from 'prop-types';
import ResultItem from '../ResultItem';

function ValidationResult({ setTypeOfModal }) {
  return (
    <div className="project__validation-result">
      <h3 className="project__validation-result__heading">
        Validation Results
      </h3>
      <ResultItem
        affirmed
        period="Validation"
        typeOfModal="validation"
        setTypeOfModal={setTypeOfModal}
      />
      <ResultItem
        affirmed
        period="Challenge"
        typeOfModal="challenge"
        setTypeOfModal={setTypeOfModal}
      />
      <ResultItem
        period="Escalation"
        typeOfModal="challenge"
        setTypeOfModal={setTypeOfModal}
      />
      <ResultItem
        affirmed
        period="Escalation"
        typeOfModal="challenge"
        setTypeOfModal={setTypeOfModal}
      />
      <ResultItem
        affirmed
        period="Escalation"
        typeOfModal="challenge"
        setTypeOfModal={setTypeOfModal}
      />
    </div>
  );
}

ValidationResult.propTypes = {
  setTypeOfModal: PropTypes.func,
};

export default ValidationResult;

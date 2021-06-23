import React from 'react';

function ValidationResult() {
  const temporaryValue = [1, 1, 1, 1, 1];
  return (
    <div className="project__validation-result">
      <h3 className="project__validation-result__heading">
        Validation Results
      </h3>
      {temporaryValue.map((item) => (
        <div className="project__validation-result__item">
          <div className="project__validation-result__icon">
            <i className={item ? 'icon-success' : 'icon-close'} />
          </div>
          <div className="project__validation-result__content">
            <span className="project__validation-result__content-text">
              Validation resolution: Stage Report
              <span
                className={`project__validation-result__content-text-${
                  item ? 'affirmed' : 'denied'
                }`}
              >
                {item ? ' AFFIRMED' : ' DENIED'}
              </span>
              . 29 votes AFFIRM, 6 votes DENY
            </span>
          </div>
          <div className="project__validation-result__more">
            <span className="project__validation-result__more-info">
              View data
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
export default ValidationResult;

import React from 'react';
import PropTypes from 'prop-types';

const CustomInput = ({
  type,
  placeholder,
  labelText,
  labelIcon,
  classInputWrapper,
  classInput,
  classLabel,
  backgroundText,
  backgroundTextClass,
  change,
  /* eslint-disable react/prop-types */
  warningMessage,
  /* eslint-disable react/prop-types */
  /* value can be as string, as number */
  value,
}) => {
  const inputType = type || 'text';
  return (
    <div className={`input-wrapper ${classInputWrapper}`}>
      {labelText && (
        <label className={`input-label ${classLabel}`}>
          {labelIcon && <i className="icon-filter-validator" />}
          <span>{labelText}</span>
        </label>
      )}
      {backgroundText && (
        <label className={backgroundTextClass}>{backgroundText}</label>
      )}
      {warningMessage && (
        <label className="input-warning">{warningMessage}</label>
      )}
      <input
        type={inputType}
        placeholder={placeholder}
        className={`input ${classInput}`}
        onWheel={(ev) => ev.target.blur()}
        value={value || ''}
        onChange={(ev) => change(ev.target.value)}
      />
    </div>
  );
};

CustomInput.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  labelText: PropTypes.string,
  labelIcon: PropTypes.string,
  classInputWrapper: PropTypes.string,
  classInput: PropTypes.string,
  classLabel: PropTypes.string,
  backgroundText: PropTypes.string,
  backgroundTextClass: PropTypes.string,
  change: PropTypes.func,
};

export default CustomInput;

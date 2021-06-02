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
      <input
        type={inputType}
        placeholder={placeholder}
        className={`input ${classInput}`}
        onWheel={(ev) => ev.target.blur()}
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
};

export default CustomInput;

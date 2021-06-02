import React from 'react';
import PropTypes from 'prop-types';

const CustomBtn = ({ label, handleClick, customClass, type, disabled }) => {
  const cssClass = `btn ${customClass}`;
  return (
    <button
      type={type ? 'submit' : 'button'}
      className={cssClass}
      onClick={(e) => handleClick(e)}
      disabled={disabled}
    >
      <span>{label}</span>
    </button>
  );
};

CustomBtn.propTypes = {
  label: PropTypes.string,
  handleClick: PropTypes.func,
  customClass: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
};

export default CustomBtn;

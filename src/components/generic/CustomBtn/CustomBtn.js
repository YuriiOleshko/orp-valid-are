/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';

const CustomBtn = ({
  label,
  handleClick,
  customClass,
  type,
  disabled,
  iconClass,
}) => {
  const cssClass = `btn ${customClass} ${disabled ? 'btn__disabled' : ''}`;
  const cssImage = `def ${iconClass}`;
  return (
    <button
      type={type ? 'submit' : 'button'}
      className={cssClass}
      onClick={(e) => handleClick(e)}
      disabled={disabled}
    >
      {iconClass && <i className={cssImage} />}
      <span>{label}</span>
    </button>
  );
};

CustomBtn.propTypes = {
  handleClick: PropTypes.func,
  customClass: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
};

export default CustomBtn;

/* eslint-disable  jsx-a11y/click-events-have-key-events */
/* eslint-disable  jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
// import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';

const CustomSelect = ({ placeholder, labelText, options }) => {
  // const intl = useIntl();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value) => () => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  return (
    <div className="select-wrapper">
      <span className="select-header">{labelText}</span>
      <div className="select-body">
        <div className="select-active" onClick={toggling}>
          {selectedOption || (
            <span className="select-placeholder">{placeholder}</span>
          )}
          <i className="icon-arrow" />
        </div>
        {isOpen && (
          <div className="select-list-wrapper">
            <ul className="select-list">
              {options.map((option) => (
                <li
                  className="select-item"
                  onClick={onOptionClicked(option)}
                  key={Math.random()}
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

CustomSelect.propTypes = {
  placeholder: PropTypes.string,
  labelText: PropTypes.string,
  options: PropTypes.array,
};

export default CustomSelect;

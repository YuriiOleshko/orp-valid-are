import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CustomBtn from '../generic/CustomBtn';

function Resolution({ affirmed, period }) {
  const [hideElement, setState] = useState(true);

  return (
    <div className="resolution">
      <div className="resolution__list">
        <div className="resolution__item">
          <i className={affirmed ? 'icon-success' : 'icon-close'} />
        </div>
        <div className="resolution__item">
          <span
            className={`resolution__text ${
              hideElement ? 'up' : 'dropdown'
            }-text`}
          >
            {period} resolution: Stage Report {affirmed ? 'AFFIRMED' : 'DENIED'}
          </span>
        </div>
        <div className={`resolution__item ${hideElement ? 'up' : 'dropdown'}`}>
          <CustomBtn
            label={
              <i
                className={`icon-open-arrow ${hideElement ? 'up' : 'dropdown'}`}
              />
            }
            handleClick={() => setState(!hideElement)}
            customClass="resolution__btn"
          />
        </div>
      </div>
      <div className={`resolution__content ${hideElement ? 'up' : 'dropdown'}`}>
        <span className="resolution__text">
          {period} window: <b>11.12.2021 – 11.01.2022</b>
        </span>
        <span className="resolution__text">
          Your {period} stake: <b>120 OPP</b>
        </span>
        <span className="resolution__text ">
          Validators voted: <b>13</b>
        </span>
      </div>
    </div>
  );
}

Resolution.propTypes = {
  affirmed: PropTypes.bool,
  period: PropTypes.string,
};

export default Resolution;

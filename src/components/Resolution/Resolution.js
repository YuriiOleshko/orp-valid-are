/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import React, { useState } from 'react';
import CustomBtn from '../generic/CustomBtn';
import { formattedDate, nanoToMicro } from '../../utils/convert-utils';

function Resolution({ approve, period, stake, ends_at, starts_at }) {
  const [hideElement, setState] = useState(true);

  return (
    <div className="resolution">
      <div className="resolution__list">
        <div className="resolution__item">
          <i className={approve ? 'icon-success' : 'icon-close'} />
        </div>
        <div className="resolution__item">
          <span
            className={`resolution__text ${
              hideElement ? 'up' : 'dropdown'
            }-text`}
          >
            {period} resolution: Stage Report {approve ? 'AFFIRMED' : 'DENIED'}
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
          {period} window:{' '}
          <b>
            {formattedDate(nanoToMicro(starts_at), '.')} –{' '}
            {formattedDate(nanoToMicro(ends_at), '.')}
          </b>
        </span>
        <span className="resolution__text">
          Your {period} stake: <b>{stake} OPP</b>
        </span>
        <span className="resolution__text ">
          Validators voted: <b>13</b>
        </span>
      </div>
    </div>
  );
}

export default Resolution;

/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import { ipfsURL } from '../../../../state/near';

const WrapperScaleImg = ({ cid }) => {
  const [activeScale, setActiveScale] = useState(false);
  const cssClass = `scaler ${activeScale ? 'active' : ''}`;
  const togglePopup = () => {
    document.body.classList.toggle('no-scroll');
    setActiveScale(!activeScale);
  };

  return (
    <div className={cssClass}>
      <div className="scaler__wrapper">
        <div className="scaler__prev">
          <img src={`${ipfsURL}${cid}`} alt="" />
          <div className="scaler__icon">
            <i className="icon-loop" onClick={togglePopup} />
          </div>
        </div>
        <div className="scaler__popup">
          <div className="scaler__close">
            <i className="icon-close" onClick={togglePopup} />
          </div>
          <div className="scaler__img">
            <img src={`${ipfsURL}${cid}`} alt="" />
          </div>
          <div className="scaler__bg" onClick={togglePopup} />
        </div>
      </div>
    </div>
  );
};

export default WrapperScaleImg;

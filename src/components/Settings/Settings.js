import React, { useState } from 'react';
import CustomBtn from '../generic/CustomBtn/CustomBtn';

function Settings() {
  const [visibilyty, setVisibilyty] = useState(false);

  const userName = 'Johny Cage';
  return (
    <div className="settings">
      <span className="settings__name">{userName}</span>
      <CustomBtn
        label={<i className="icon-gear" />}
        customClass="settings__btn"
        handleClick={() => {
          setVisibilyty(!visibilyty);
        }}
      />
      <div className={`settings__drop-down ${visibilyty ? 'show' : 'hide'}`}>
        <div className="settings__drop-down__text">
          <CustomBtn
            label="Toggle Alerts"
            customClass="settings__drop-down__item"
            handleClick={() => {}}
          />
          <CustomBtn
            label="Automatically Stake"
            customClass="settings__drop-down__item"
            handleClick={() => {}}
          />
          <CustomBtn
            label={<b>Log out</b>}
            customClass="settings__drop-down__item"
            handleClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
}

export default Settings;

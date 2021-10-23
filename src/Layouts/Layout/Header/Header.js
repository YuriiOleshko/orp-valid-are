/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { memo, useContext } from 'react';
import { useIntl } from 'react-intl';
import { ReactSVG } from 'react-svg';
import { useHistory } from 'react-router';
import { appStore } from '../../../state/app';
import Settings from '../../../components/Settings/Settings';
import CustomBtn from '../../../components/generic/CustomBtn';

// import logo from '../../../assets/image/ORPLogo.svg';
import logo from '../../../assets/image/logo.svg';
import { headerLogin } from './LangHeader';

const Header = () => {
  const intl = useIntl();
  const history = useHistory();
  const { state } = useContext(appStore);
  const { app, wallet } = state;
  const { profile } = app;
  // eslint-disable-next-line
  const getUserName = () =>
    profile
      ? `${profile?.first_name} ${profile?.last_name}`
      : 'Setup Your Account ';
  return (
    <header className="header">
      <div className="header__wrapper">
        <div className="header__menu">
          <ReactSVG src={logo} />
        </div>
        <nav className="header__navbar">
          <div className="header__links">
            <a href="/" className="header__link">
              Wallet
            </a>
            <a href="/" className="header__link">
              Delegate
            </a>
            <a href="/" className="header__link">
              Validate
            </a>
          </div>
          {wallet?.signedIn ? (
            <Settings wallet={wallet} userName={getUserName()} />
          ) : (
            <div className="settings" onClick={() => history.push('/login')}>
              <span className="settings__name">
                {intl.formatMessage(headerLogin)}
              </span>
              <CustomBtn
                label={<i className="icon-log-in" />}
                customClass="settings__btn"
                handleClick={() => {}}
              />
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default memo(Header);

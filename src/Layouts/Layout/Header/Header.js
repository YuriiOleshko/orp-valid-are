import React, { memo } from 'react';
// import { useIntl } from 'react-intl';
import { ReactSVG } from 'react-svg';
import logo from '../../../assets/image/ORPLogo.svg';
import Settings from '../../../components/Settings/Settings';
// import { headerLogin } from './LangHeader';

const Header = () => (
  // const intl = useIntl();

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
        <Settings />
        {/* <div className="header__login">
          <span className="login">{intl.formatMessage(headerLogin)}</span>
          <i className="icon-log-in" />
        </div> */}
      </nav>
    </div>
  </header>
);

export default memo(Header);

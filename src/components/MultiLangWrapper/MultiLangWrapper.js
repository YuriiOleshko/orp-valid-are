import React from 'react';
import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';
import Russian from '../../lang/ru.json';
import English from '../../lang/en.json';

const local = navigator.language;
let lang;
if (local === 'en') {
  lang = English;
} else if (local === 'ru') {
  lang = Russian;
} else {
  lang = English;
}

const MultiLangWrapper = (props) => {
  const { children } = props;
  return (
    <IntlProvider messages={lang} locale={local}>
      {children}
    </IntlProvider>
  );
};

MultiLangWrapper.propTypes = {
  children: PropTypes.element,
};

export default MultiLangWrapper;

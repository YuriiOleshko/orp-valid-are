import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import {
  openText,
  completedText,
  resolvedText,
  pendingText,
  unknownText,
} from './LangStatus';

function Status(props) {
  const intl = useIntl();
  function statusValue(status) {
    switch (status) {
      case 'open':
        return {
          text: intl.formatMessage(openText),
          class: 'open',
        };
      case 'completed':
        return {
          text: intl.formatMessage(completedText),
          class: 'completed',
        };
      case 'resolved':
        return {
          text: intl.formatMessage(resolvedText),
          class: 'completed',
        };
      case 'pending':
        return {
          text: intl.formatMessage(pendingText),
          class: 'pending',
        };
      default:
        return {
          text: intl.formatMessage(unknownText),
          class: 'pending',
        };
    }
  }

  return (
    <div className={`item-status ${statusValue(props.status).class}`}>
      <span>{statusValue(props.status).text}</span>
    </div>
  );
}

Status.propTypes = {
  status: PropTypes.string,
};

export default Status;

/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';

const StatsItem = ({ vote, totalStake, affirmed, number, typeOfModal }) => {
  let itemView;
  switch (typeOfModal) {
    case 'general':
      itemView = (
        <>
          <div className="item-address-general">
            <span>{vote.owner_id}</span>
          </div>
          <div className="item-stake-general">
            <span>{affirmed ? vote.affirm_stake : vote.deny_stake} OPN</span>
          </div>
          <div className="item-share-general">
            <span>
              {affirmed
                ? (vote.affirm_stake / totalStake) * 100
                : (vote.deny_stake / totalStake) * 100}
              %
            </span>
          </div>
          <div className="item-value-general">
            <span>{vote.reward} DAI</span>
          </div>
        </>
      );
      break;
    case 'validation':
      itemView = (
        <>
          <div className="item-address-validation">
            <span>{vote.owner_id}</span>
          </div>
          <div className="item-stake-validation">
            <span>{vote.stake} OPN</span>
          </div>
          <div className="item-vote-validation">
            <span>{vote.vote ? 'Affirm' : 'Deny'}</span>
          </div>
        </>
      );
      break;
    case 'challenge':
    case 'escalation3':
    case 'escalation4':
    case 'escalation5':
      itemView = (
        <>
          <div className="item-address-challenge">
            <span>{vote.owner_id}</span>
          </div>
          <div className="item-stake-challenge">
            <span>{vote.stake} OPN</span>
          </div>
        </>
      );
      break;
    default:
      break;
  }

  return (
    <div className="list-item">
      <div className="item-number">{number}.</div>
      {itemView}
      <a href="/#" className="item-link">
        View Txn
      </a>
    </div>
  );
};

StatsItem.propTypes = {
  number: PropTypes.number,
  typeOfModal: PropTypes.string,
};

export default StatsItem;

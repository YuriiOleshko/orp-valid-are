import React from 'react';
import PropTypes from 'prop-types';

const StatsItem = ({ number, typeOfModal }) => {
  let itemView;

  switch (typeOfModal) {
    case 'general':
      itemView = (
        <>
          <div className="item-address-general">
            <span>BGCCDDHfysuuVnaNVtEhhqeT4k9Muyem3Kpgq2U1m9HX</span>
          </div>
          <div className="item-stake-general">
            <span>250 OPP</span>
          </div>
          <div className="item-share-general">
            <span>6%</span>
          </div>
          <div className="item-value-general">
            <span>7 DAI</span>
          </div>
        </>
      );
      break;
    case 'validation':
      itemView = (
        <>
          <div className="item-address-validation">
            <span>BGCCDDHfysuuVnaNVtEhhqeT4k9Muyem3Kpgq2U1m9HX</span>
          </div>
          <div className="item-stake-validation">
            <span>250 OPP</span>
          </div>
          <div className="item-vote-validation">
            <span>Affirm</span>
          </div>
        </>
      );
      break;
    case 'challenge':
      itemView = (
        <>
          <div className="item-address-challenge">
            <span>BGCCDDHfysuuVnaNVtEhhqeT4k9Muyem3Kpgq2U1m9HX</span>
          </div>
          <div className="item-stake-challenge">
            <span>250 OPP</span>
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

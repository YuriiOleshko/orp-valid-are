import React from 'react';
import PropTypes from 'prop-types';
import CustomBtn from '../../../../components/generic/CustomBtn';
import StatsItem from '../StatsItem/StatsItem';

const ValidationStats = ({ typeOfModal, setTypeOfModal }) => {
  const statsArr = new Array(20).fill(1);
  let totalValiatorsView;
  let headerView;
  let listView;

  switch (typeOfModal) {
    case 'general':
      totalValiatorsView = <span>Validators Voted: 78</span>;
      headerView = (
        <div className="project__stats-list-header">
          <div className="header-address-general">
            <span>Validator Address</span>
          </div>
          <div className="header-stake-general">
            <span>Stake</span>
          </div>
          <div className="header-share-general">
            <span>Reward Share</span>
          </div>
          <div className="header-value-general">
            <span>Reward Value</span>
          </div>
        </div>
      );
      listView = (
        <div className="project__stats-list-body">
          {statsArr.map((item, id) => (
            <StatsItem
              typeOfModal={typeOfModal}
              number={id + 1}
              key={`Stats${Date.now() + id}`}
            />
          ))}
        </div>
      );
      break;
    case 'validation':
      totalValiatorsView = (
        <>
          <span>Validators Voted: 78</span>
          <span className="project__stats-affirm-validators">
            Voted <span>Affirm</span>: 47 validators, 2009 OPP
          </span>
          <span className="project__stats-deny-validators">
            Voted <span>Deny</span>: 47 validators, 2009 OPP
          </span>
        </>
      );
      headerView = (
        <div className="project__stats-list-header">
          <div className="header-address-validation">
            <span>Validator Address</span>
          </div>
          <div className="header-stake-validation">
            <span>Stake</span>
          </div>
          <div className="header-vote-validation">
            <span>Vote</span>
          </div>
        </div>
      );
      listView = (
        <div className="project__stats-list-body">
          {statsArr.map((item, id) => (
            <StatsItem
              typeOfModal={typeOfModal}
              number={id + 1}
              key={`Stats${Date.now() + id}`}
            />
          ))}
        </div>
      );
      break;
    case 'challenge':
      totalValiatorsView = <span>Validators Voted: 78</span>;
      headerView = (
        <div className="project__stats-list-header">
          <div className="header-address-challenge">
            <span>Validator Address</span>
          </div>
          <div className="header-stake-challenge">
            <span>Stake</span>
          </div>
        </div>
      );
      listView = (
        <div className="project__stats-list-body">
          {statsArr.map((item, id) => (
            <StatsItem
              typeOfModal={typeOfModal}
              number={id + 1}
              key={`Stats${Date.now() + id}`}
            />
          ))}
        </div>
      );
      break;
    default:
      break;
  }

  return (
    <div className="project__stats">
      <div className="project__stats-wrapper">
        <CustomBtn
          customClass="project__stats-btn"
          label={
            <>
              <span className="project__stats-btn-text">Close</span>
              <i className="icon-fail" />
            </>
          }
          handleClick={() => setTypeOfModal('')}
        />
        <div className="project__stats-subtitle">
          <span>Project name</span>
        </div>
        <div className="project__stats-title">
          <span>My Forest</span>
        </div>
        <div className="project__stats-total-stake">
          <span>
            Total Validation Stake: <b>2678 OPP</b>
          </span>
        </div>
        <div className="project__stats-total-validators">
          {totalValiatorsView}
        </div>
        <div className="project__stats-list">
          {headerView}
          {listView}
        </div>
      </div>
    </div>
  );
};

ValidationStats.propTypes = {
  typeOfModal: PropTypes.string,
  setTypeOfModal: PropTypes.func,
};

export default ValidationStats;

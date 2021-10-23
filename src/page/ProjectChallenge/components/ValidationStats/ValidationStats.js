/* eslint-disable react/prop-types */
/* eslint-disable */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { appStore } from '../../../../state/app';
import { contractMethods, getContract } from '../../../../utils/near-utils';
import CustomBtn from '../../../../components/generic/CustomBtn';
import StatsItem from '../StatsItem/StatsItem';
import Loader from '../../../../components/Loader';

const ValidationStats = ({
  typeOfModal,
  setTypeOfModal,
  allVotes,
  pastPeriods,
  stageVoting,
  projectName,
  claimReward,
  currentStage,
  affirmed,
  projectId,
}) => {
  let totalValiatorsView;
  let headerView;
  let listView;
  const [votesArr, setVotesArr] = useState();

  const { state } = useContext(appStore);
  const { account } = state;

  const totalStake = +stageVoting.affirm_stake + +stageVoting.deny_stake;

  // console.log(typeOfModal, 'TYPE OF MODAL');

  useEffect(async () => {
    if (account && account.accountId) {
      let arr;
      const contract = getContract(account, contractMethods, 0);
      if (typeOfModal === 'validation') arr = await contract.get_period_voters({ project_id: projectId, stage_id: currentStage.id - 1, period_id: 0 });
      if (typeOfModal === 'challenge') arr = await contract.get_period_voters({ project_id: projectId, stage_id: currentStage.id - 1, period_id: 1 });
      if (typeOfModal === 'escalation3') arr = await contract.get_period_voters({ project_id: projectId, stage_id: currentStage.id - 1, period_id: 2 });
      if (typeOfModal === 'escalation4') arr = await contract.get_period_voters({ project_id: projectId, stage_id: currentStage.id - 1, period_id: 3 });
      if (typeOfModal === 'escalation5') arr = await contract.get_period_voters({ project_id: projectId, stage_id: currentStage.id - 1, period_id: 4 });

      if (arr && arr.length) {
        setVotesArr(arr);
      } else {
        setVotesArr([]);
      }
    }
  }, [account, typeOfModal])

  if (!votesArr) {
    return <div className="loader-wrapper"><Loader /></div>;
  }

  // console.log(votesArr, 'VOTES ARR');

  switch (typeOfModal) {
    case 'general':
      totalValiatorsView = (
        <span>Validators Voted: {stageVoting.voters_number}</span>
      );
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
          {allVotes.map((item, id) => (
            <StatsItem
              vote={item}
              affirmed={affirmed}
              totalStake={totalStake}
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
          <span>Validators Voted: {stageVoting.voters_number}</span>
          <span className="project__stats-affirm-validators">
            Voted <span>Affirm</span>: {pastPeriods[0]?.affirm_number} validators, {pastPeriods[0]?.affirm_stake} OPN
          </span>
          <span className="project__stats-deny-validators">
            Voted <span>Deny</span>: {pastPeriods[0]?.deny_number} validators, {pastPeriods[0]?.deny_stake} OPN
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
          {!votesArr.length ? 'No votes' : votesArr.map((item, id) => (
            <StatsItem
              vote={item}
              typeOfModal={typeOfModal}
              number={id + 1}
              key={`Stats${Date.now() + id}`}
            />
          ))}
        </div>
      );
      break;
    case 'challenge':
      totalValiatorsView = (
        <span>Validators Voted: {stageVoting.voters_number}</span>
      );
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
          {!votesArr.length ? 'No votes' : votesArr.map((item, id) => (
            <StatsItem
              vote={item}
              typeOfModal={typeOfModal}
              number={id + 1}
              key={`Stats${Date.now() + id}`}
            />
          ))}
        </div>
      );
      break;
      case 'escalation3':
        totalValiatorsView = (
          <span>Validators Voted: {stageVoting.voters_number}</span>
        );
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
            {!votesArr.length ? 'No votes' : votesArr.map((item, id) => (
              <StatsItem
                vote={item}
                typeOfModal={typeOfModal}
                number={id + 1}
                key={`Stats${Date.now() + id}`}
              />
            ))}
          </div>
        );
        break;
        case 'escalation4':
          totalValiatorsView = (
            <span>Validators Voted: {stageVoting.voters_number}</span>
          );
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
              {!votesArr.length ? 'No votes' : votesArr.map((item, id) => (
                <StatsItem
                  vote={item}
                  typeOfModal={typeOfModal}
                  number={id + 1}
                  key={`Stats${Date.now() + id}`}
                />
              ))}
            </div>
          );
        break;
        case 'escalation5':
          totalValiatorsView = (
            <span>Validators Voted: {stageVoting.voters_number}</span>
          );
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
              {!votesArr.length ? 'No votes' : votesArr.map((item, id) => (
                <StatsItem
                  vote={item}
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
          <span>{projectName}</span>
        </div>
        <div className="project__stats-total-stake">
          <span>
            Total Validation Stake: <b>{totalStake} OPN</b>
          </span>
          <CustomBtn
            customClass="btn__load"
            label="Claim Reward"
            handleClick={() => claimReward(currentStage.id - 1)}
          />
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

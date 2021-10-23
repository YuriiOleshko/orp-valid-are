/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router';
import PropTypes from 'prop-types';
import { appStore } from '../../state/app';
import { GAS, parseNearAmount } from '../../state/near';

import Step1Wrapper from './components/Step1Wrapper';
import Step2Wrapper from './components/Step2Wrapper';
import Step3Wrapper from './components/Step3Wrapper';
import { contractMethods, getContract } from '../../utils/near-utils';

const VoteForm = ({
  data,
  stakingFinished,
  setStakingFinished,
  validationFinished,
  challengePeriod,
  escalationPeriod,
  setEscalationPeriod,
  setUserVote,
}) => {
  const {
    closeDate,
    openDate,
    timeLeft,
    affirmed,
    stake,
    userStake,
    userVote,
    userVoteApproved,
    currentStage,
    currentPeriod,
    isRevoked,
    setIsRevoked,
    validationVote,
    lastActivePeriod,
  } = data;

  // console.log(data);

  const { state, update } = useContext(appStore);
  const { account } = state;
  const location = useLocation();
  const [name] = location.pathname.split('/').splice(-1);

  const [numOfOPP, setNumOfOPP] = useState(userStake);
  const [voteResult, setVoteResult] = useState(userVote);
  const [step, setStep] = useState(1);
  const [isActiveAlert, setIsActiveAlert] = useState(false);

  // console.log(stakingFinished, 'STAKING FINISH');
  // console.log(voteResult, 'VOTE RESSS');

  useEffect(() => {
    if (validationFinished) {
      setVoteResult(voteResult);
      setNumOfOPP(numOfOPP);
      setStep(3);
      return;
    }

    if (stakingFinished) {
      if (typeof voteResult === 'boolean') {
        setStep(2);
      }
      return;
    }

    if (isRevoked) {
      setStep(2);
    }

    if (typeof voteResult === 'boolean') {
      setVoteResult(voteResult);
      setNumOfOPP(userStake);
      setStep(2);
    }
  }, [validationFinished, stakingFinished, voteResult]);

  const affirmDataUpload = async () => {
    update('loading', true);
    const deposit = parseNearAmount('1');
    const contract = getContract(account, contractMethods, 0);
    if (+numOfOPP > 0) {
      await contract.add_vote(
        {
          project_id: name,
          stage_id: currentStage.id - 1,
          period_id: currentPeriod.id,
          vote: true,
          stake: numOfOPP,
        },
        GAS,
        deposit,
      );
      setIsActiveAlert(false);
      setVoteResult(true);
      setStep((prev) => prev + 1);
    } else {
      setIsActiveAlert(true);
    }
    update('loading', false);
  };

  const denyDataUpload = async () => {
    update('loading', true);
    const deposit = parseNearAmount('1');
    const contract = getContract(account, contractMethods, 0);
    if (+numOfOPP > 0) {
      await contract.add_vote(
        {
          project_id: name,
          stage_id: currentStage.id - 1,
          period_id: currentPeriod.id,
          vote: false,
          stake: numOfOPP,
        },
        GAS,
        deposit,
      );

      setIsActiveAlert(false);
      setVoteResult(false);
      setStep((prev) => prev + 1);
    } else {
      setIsActiveAlert(true);
    }
    update('loading', false);
  };

  const changeVote = async () => {
    update('loading', true);
    // const deposit = parseNearAmount('1');
    // const contract = getContract(account, contractMethods, 0);
    // await contract.revoke_vote(
    //   {
    //     project_id: name,
    //     stage_id: currentStage.id - 1,
    //     period_id: currentPeriod.id,
    //   },
    //   GAS,
    //   // deposit,
    // );
    // setIsRevoked(false);
    // setUserVote(undefined);
    // setStep((prev) => prev - 1);
    // update('loading', false);
    const deposit = '1';
    const contract = getContract(account, contractMethods, 2);
    await contract.ft_transfer_call(
      {
        receiver_id: 'c1.ofp.testnet',
        amount: `${numOfOPP}`,
        memo: null,
        msg: JSON.stringify({
          details: 1,
          project_id: name,
          stage_id: currentStage.id - 1,
          period_id: currentPeriod.id,
        }),
      },
      GAS,
      deposit,
    );
  };

  const revokeVote = async () => {
    update('loading', true);
    // const deposit = parseNearAmount('1');
    const contract = getContract(account, contractMethods, 0);
    await contract.revoke_vote(
      {
        project_id: name,
        stage_id: currentStage.id - 1,
        period_id: currentPeriod.id,
      },
      GAS,
      // deposit,
    );
    setUserVote(undefined);
    setIsRevoked(true);
    update('loading', false);
  };

  const voteAgain = () => {
    setNumOfOPP(0);
    setStep(1);
  };

  const submitVote = () => {
    if (+numOfOPP > 0) {
      setIsActiveAlert(false);
      setStep((prev) => prev + 1);
    } else {
      setIsActiveAlert(true);
    }
  };

  const confirmVote = async (againstPrevVote) => {
    update('loading', true);
    const deposit = parseNearAmount('1');
    const contract = getContract(account, contractMethods, 0);
    await contract.add_vote(
      {
        project_id: name,
        stage_id: currentStage.id - 1,
        period_id: currentPeriod.id,
        vote: againstPrevVote,
        stake: numOfOPP,
      },
      GAS,
      deposit,
    );
    setStakingFinished(true);
    update('loading', false);
  };

  const cancelVote = () => {
    setStep((prev) => prev - 1);
  };

  return (
    <div
      className={`project__validate ${
        challengePeriod ? 'project__challenge' : ''
      }`}
    >
      {step === 1 && (
        <Step1Wrapper
          data={{
            ...data,
            isActiveAlert,
            challengePeriod,
            numOfOPP,
            setNumOfOPP,
            submitVote,
            affirmDataUpload,
            stakingFinished,
            denyDataUpload,
            escalationPeriod,
          }}
        />
      )}
      {step === 2 && (
        <Step2Wrapper
          data={{
            ...data,
            challengePeriod,
            numOfOPP,
            stakingFinished,
            confirmVote,
            cancelVote,
            isRevoked,
            voteResult,
            changeVote,
            revokeVote,
            timeLeft,
            voteAgain,
            lastActivePeriod,
            userVoteApproved,
          }}
        />
      )}
      {step === 3 && (
        <Step3Wrapper
          data={{
            ...data,
            numOfOPP,
            challengePeriod,
            escalationPeriod,
            setEscalationPeriod,
            validationVote,
            voteResult,
            userVoteApproved,
            userVote,
          }}
        />
      )}
    </div>
  );
};

VoteForm.propTypes = {
  data: PropTypes.object,
  stakingFinished: PropTypes.bool,
  setStakingFinished: PropTypes.func,
  validationFinished: PropTypes.bool,
  challengePeriod: PropTypes.bool,
  escalationPeriod: PropTypes.bool,
  setEscalationPeriod: PropTypes.func,
  currentStage: PropTypes.object,
  currentPeriod: PropTypes.object,
  setUserVote: PropTypes.func,
};

export default VoteForm;

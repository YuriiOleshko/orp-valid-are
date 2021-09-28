/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable no-lonely-if */
/* eslint-disable */
import React, { useEffect, useState, useContext } from 'react';
import { useHistory, useLocation } from 'react-router';
import { contractMethods, getContract } from '../../utils/near-utils';
import { appStore } from '../../state/app';

import Ongoing from '../../components/Ongoing';
import OngoingResult from '../../components/OngoingResult/OngoingResult';
import VoteInfo from '../../components/VoteInfo';
import VoteForm from '../../components/VoteForm';
import StageReport from '../../components/StageReport/StageReport';
import Loader from '../../components/Loader';

import greyTree1 from '../../assets/image/trees/greyTree1.svg';
import greyTree2 from '../../assets/image/trees/greyTree2.svg';
import greyTree3 from '../../assets/image/trees/greyTree3.svg';
import colorTree1 from '../../assets/image/trees/colorTree1.svg';
import colorTree2 from '../../assets/image/trees/colorTree2.svg';
import colorTree3 from '../../assets/image/trees/colorTree3.svg';
import fullTree1 from '../../assets/image/trees/fullTree1.svg';
import fullTree2 from '../../assets/image/trees/fullTree2.svg';
import fullTree3 from '../../assets/image/trees/fullTree3.svg';
import { nanoToMicro } from '../../utils/convert-utils';
import { getJSONFileFromIpfs, initIPFS } from '../../state/ipfs';

const treeImages = [
  [greyTree1, colorTree1, fullTree1],
  [greyTree2, colorTree2, fullTree2],
  [greyTree3, colorTree3, fullTree3],
];
const randomTreeImage = treeImages[Math.round(Math.random() * 2)];

const ProjectValidation = () => {
  const { state, update } = useContext(appStore);
  const { account } = state;
  const location = useLocation();
  const history = useHistory();
  const [name] = location.pathname.split('/').splice(-1);
  const [data, setData] = useState(location.state?.data);

  const [projectStarted, setProjectStarted] = useState(true);
  const [projectFinished, setProjectFinished] = useState(false);
  const [currentStage, setCurrentStage] = useState();
  const [currentPeriod, setCurrentPeriod] = useState();
  const [stageVoting, setStageVoting] = useState();
  const [lockTime, setLockTime] = useState(0);
  const [isRevoked, setIsRevoked] = useState(false);

  const [periodResult, setPeriodResult] = useState({});
  const [openDate, setOpenDate] = useState();
  const [closeDate, setCloseDate] = useState();
  const [timeLeft, setTimeLeft] = useState();
  const [stakingFinished, setStakingFinished] = useState(false);
  const [validationFinished, setValidationFinished] = useState(false);
  const [treeHeight, setTreeHeight] = useState(0);
  const [affirmed, setAffirmed] = useState();
  const [stake, setStake] = useState();
  const [userVote, setUserVote] = useState();
  const [userStake, setUserStake] = useState();
  const [validationVote, setValidationVote] = useState();

  const oneMinute = 60 * 1000;
  const thirtyDays = 30 * 24 * 60 * 60 * 1000;
  const sizePerMinute = 100 / (thirtyDays / oneMinute);

  useEffect(async () => {
    update('loading', true);
    if (account) {
      const contract = getContract(account, contractMethods, 0);
      if (!data) {
        const ipfs = await initIPFS();
        const projectData = await contract.get_project({ project_id: name });
        if (projectData) {
          const item = await getJSONFileFromIpfs(ipfs, projectData.info.cid);
          setData({
            id: projectData.token_id,
            item,
          });
          return;
        }
      }

      // If current date is less than project start date
      if (Date.now() < data.item.startTimeProject) {
        setProjectStarted(false);
        update('loading', false);
        return;
      }
      setProjectStarted(true);

      const currPeriod = await contract.get_current_project_period({
        project_id: data.id,
      });
      setCurrentPeriod(currPeriod);

      // If period exists and it is validation
      if (currPeriod) {
        // If main project time is finished, we need to define last stage if period exists
        // (because last validation of last stage overlaps on nowhere and get_current_stage return null)
        if (Date.now() > data.item.finishTimeProject) {
          const allStages = await contract.get_project_stages({
            project_id: data.id,
          });
          const lastStage = { ...allStages[allStages.length - 1] };
          setCurrentStage(lastStage);
          const stgVoting = await contract.get_stage_voting({
            project_id: data.id,
            stage_id: lastStage.id,
          });
          if (!stgVoting) return;
          setStageVoting(stgVoting);
        } else {
          // If current date is in range of start and finish project time
          // console.log(currPeriod, 'CURRENT PERIOD');
          const currStage = await contract.get_current_project_stage({
            project_id: data.id,
          });
          // console.log(currStage);
          if (!currStage) return;
          setCurrentStage(currStage);

          const stgVoting = await contract.get_stage_voting({
            project_id: data.id,
            stage_id: currStage.id - 1,
          });

          if (!stgVoting) return;
          setStageVoting(stgVoting);

          if (stgVoting.closed) {
            history.push(`/project/challenge/${name}`);
          }

          const accountVotes = await contract.get_account_votes({
            account_id: account.accountId,
          });

          const usrVote = accountVotes.find(
            (item) =>
              item.project_id === data.id &&
              item.stage_id === currStage.id - 1 &&
              item.period_id === 0,
          );

          // console.log(accountVotes, 'ACCOUNT VOTES');

          // console.log(usrVote, 'USER VOTE');

          // console.log(stgVoting, 'STAGE VOTING');

          const allPer = await contract.get_periods_per_project_stage({
            project_id: data.id,
            stage_id: currStage.id - 1,
          });

          const validPeriod = allPer.find((item) => item.id === 0);

          // console.log(allPer, 'ALL PERIODS');
          // console.log(validPeriod, 'VALID PERIOD');

          const validVoteResult = { ...stgVoting.voting_per_period[0] };

          // console.log(validVoteResult, 'STAGE VOTING VALID');

          const open = nanoToMicro(validVoteResult.starts_at);
          const close = nanoToMicro(validVoteResult.ends_at);
          setPeriodResult(validVoteResult);
          setOpenDate(open);
          setCloseDate(close);
          setTimeLeft(Date.now() >= close ? 0 : close - Date.now());
          setTreeHeight(sizePerMinute * ((close - Date.now()) / oneMinute));
          setValidationFinished(Date.now() > close);
          setUserVote(usrVote?.vote);
          setUserStake(usrVote?.stake / 1e24);
          setAffirmed(+validVoteResult?.affirm_stake > +validVoteResult?.deny_stake);
          setValidationVote(+validVoteResult?.affirm_stake > +validVoteResult?.deny_stake);
          setStake(validVoteResult?.stake);

          if (currPeriod.id === 0) {
            setLockTime(nanoToMicro(currPeriod.lock_at));
          } else {
            setLockTime(nanoToMicro(validPeriod.lock_at));
            update('loading', false);
            setTimeLeft(0);
            if (usrVote === undefined || !usrVote.approved) {
              history.push(`/project/challenge/${name}`);
            }
          }
          update('loading', false);
        }
      } else if (Date.now() > data.item?.finishTimeProject) {
        // If main project time is finished and period doesn't exist
        setProjectFinished(true);
      }

      update('loading', false);
    }
  }, [account, data, userVote]);

  useEffect(() => {
    setTreeHeight(sizePerMinute * (timeLeft / oneMinute));
  }, [timeLeft]);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setTimeLeft(timeLeft - oneMinute);
    }, oneMinute);
    if (timeLeft <= 0) {
      clearTimeout(timeOut);
      setTimeLeft(0);
      setStakingFinished(false);
      setValidationFinished(true);
    }
    return () => clearTimeout(timeOut);
  });

  if (state.loading) {
    return <Loader />;
  }

  if (!projectStarted) {
    return <span>Project has&apos;t started yet.</span>;
  }

  if (projectFinished) {
    return <span>Project was finished.</span>;
  }

  if (currentStage === null) {
    return <span>Stage has&apos;t started yet.</span>;
  }

  if (stageVoting === null || !stageVoting?.approved) {
    return <span>No voting per stage yet.</span>;
  }

  // if (stageVoting?.closed) {
  //   return <span>Voting per stage is closed.</span>;
  // }

  // console.log(currentStage, 'CURRENT STAGE');

  return (
    <div className="project">
      <div className="project__header">
        <div>
          <h2 className="project__header-subtitle">Project name</h2>
          <h1 className="project__header-title">{data.id}</h1>
        </div>
        <StageReport />
      </div>
      <div className="project__body">
        {validationFinished ? (
          <OngoingResult
            data={{ ...data, openDate, closeDate, affirmed, periodResult }}
            affirmedText="Stage Report AFFIRMED"
            deniedText="Stage Report DENIED."
            validationPeriod
          />
        ) : (
          <Ongoing
            data={{ ...data, timeLeft, openDate, closeDate, lockTime }}
            stakingFinished={stakingFinished}
            setStakingFinished={setStakingFinished}
            showDeadline
            title="Ongoing Validation Window"
          />
        )}
        <div className="project__validation-info">
          <VoteInfo
            validationFinished={validationFinished}
            title="Voting in Progress"
            finishedTitle="Voting Completed"
            treeHeight={treeHeight}
            greyTree={randomTreeImage[0]}
            colorTree={randomTreeImage[1]}
            fullTree={randomTreeImage[2]}
          />
          <VoteForm
            data={{
              ...data,
              timeLeft,
              affirmed,
              stake,
              userStake,
              userVote,
              validationVote,
              currentStage,
              currentPeriod,
              isRevoked,
              setIsRevoked,
            }}
            setUserVote={setUserVote}
            stakingFinished={stakingFinished}
            validationFinished={validationFinished}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectValidation;

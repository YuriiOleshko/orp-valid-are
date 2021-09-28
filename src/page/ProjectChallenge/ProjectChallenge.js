/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable */
import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router';
import { contractMethods, getContract } from '../../utils/near-utils';
import { appStore } from '../../state/app';
import { getJSONFileFromIpfs, initIPFS } from '../../state/ipfs';
import { nanoToMicro } from '../../utils/convert-utils';

import Ongoing from '../../components/Ongoing';
import OngoingResult from '../../components/OngoingResult/OngoingResult';
import VoteInfo from '../../components/VoteInfo';
import VoteForm from '../../components/VoteForm';
import StageReport from '../../components/StageReport';
import StageStatus from './components/StageStatus';
import ProjectEscalation from './components/ProjectEscalation';
import Loader from '../../components/Loader';

import fullTree1 from '../../assets/image/trees/fullTree1.svg';
import fullTree2 from '../../assets/image/trees/fullTree2.svg';
import fullTree3 from '../../assets/image/trees/fullTree3.svg';
import grownTree1 from '../../assets/image/trees/grownTree1.svg';
import grownTree2 from '../../assets/image/trees/grownTree2.svg';
import grownTree3 from '../../assets/image/trees/grownTree3.svg';
import afterTree1 from '../../assets/image/trees/afterTree1.svg';
import afterTree2 from '../../assets/image/trees/afterTree2.svg';
import afterTree3 from '../../assets/image/trees/afterTree3.svg';

const treeImages = [
  [fullTree1, grownTree1, afterTree1],
  [fullTree2, grownTree2, afterTree2],
  [fullTree3, grownTree3, afterTree3],
];
const randomTreeImage = treeImages[Math.round(Math.random() * 2)];

const ProjectChallenge = () => {
  const { state, update } = useContext(appStore);
  const { account } = state;
  const location = useLocation();
  const [name] = location.pathname.split('/').splice(-1);
  // const [data, setData] = useState(location.state?.data);
  const [data, setData] = useState();

  // In Challenge Window open date is the end date of Validation Window
  // Challenge Window last 7 days
  const oneMinute = 60 * 1000;
  const oneDay = 1000 * 60 * 60 * 24;
  const oneWeek = 7 * 24 * 60 * 60 * 1000;

  const [projectStarted, setProjectStarted] = useState(true);
  const [projectFinished, setProjectFinished] = useState(false);
  const [currentStage, setCurrentStage] = useState();
  const [stageVoting, setStageVoting] = useState();

  const [currentPeriod, setCurrentPeriod] = useState();
  const [allPeriods, setAllPeriods] = useState();
  const [openDate, setOpenDate] = useState();
  const [showPeriod, setShowPeriod] = useState(false);
  const [closeDate, setCloseDate] = useState();
  const [timeLeft, setTimeLeft] = useState();
  const [stakingFinished, setStakingFinished] = useState(false);
  const [validationFinished, setValidationFinished] = useState();
  const [escalationPeriod, setEscalationPeriod] = useState(false);
  const [numOfEscalation, setNumOfEscalation] = useState(0);
  const [affirmed, setAffirmed] = useState();
  const [challengeVote, setChallengeVote] = useState();
  const [validationVote, setValidationVote] = useState();
  const [escalationVote, setEscalationVote] = useState();
  const [stake, setStake] = useState();
  const [userVote, setUserVote] = useState();
  const [userStake, setUserStake] = useState();
  const [arrOfResolution, setArrOfResolution] = useState([]);

  const defineCurrentPeriod = async (allPer) => {
    const contract = getContract(account, contractMethods, 0);
    const period = await contract.get_current_project_period({
      project_id: name,
    });
    if (!period) {
      setTimeLeft(0);
      setEscalationPeriod(true);
      setShowPeriod(true);
      setValidationFinished(true);
      setStakingFinished(true);
      setNumOfEscalation(3);
      return {};
    }
    const projectVotes = await contract.get_project_votes({
      project_id: name,
    });

    const challengeVoteResult = stgVoting.voting_per_period.find(
      (item) => item.period_id === 1,
    );
    const validationVoteResult = stgVoting.voting_per_period.find(
      (item) => item.period_id === 0,
    );

    const accountVotes = await contract.get_account_votes({
      account_id: account.accountId,
    });

    const usrVote = accountVotes.find(
      (item) =>
        item.project_id === data.id &&
        item.stage_id === currStage.id - 1 &&
        item.period_id === currentPeriod.id,
    );

    setAllPeriods(allPer);
    if (period.id >= 2 && period.id <= 4) {
      const arrEscalPeriod = allPer.filter(
        (item) => item.id <= period.id,
      );
      arrEscalPeriod.splice(0, 2);

      const pastEscalationResults = arrEscalPeriod.map((i, index) => {
        const voteExist = projectVotes.find((item) => item.period_id === i.id);
        if (voteExist) {
          return { ...voteExist, starts_at: i.starts_at, ends_at: i.ends_at };
        }
        return { starts_at: i.starts_at, ends_at: i.ends_at, stake: '---' };
      });
      pastEscalationResults.pop();
      setArrOfResolution(pastEscalationResults);

      const escalationVoteResult = projectVotes.find(
        (item) =>
          item.period_id === arrEscalPeriod[arrEscalPeriod.length - 1].id,
      );

      if (escalationVoteResult) {
        setValidationFinished(false);
        setStakingFinished(true);
      }
      setEscalationVote(escalationVoteResult?.approve);
      setUserVote(escalationVoteResult?.approve);
      setUserStake(escalationVoteResult?.stake / 1e24);
      setEscalationPeriod(true);
      setShowPeriod(true);
      // setValidationFinished(true);
      // setStakingFinished(false);
      // setTimeLeft(0);
      const pastEscalations = period.id >= 3 ? numOfEscalation + 1 : 0;
      setNumOfEscalation(pastEscalations);
      if (pastEscalations > 3) {
        setValidationFinished(true);
        setShowPeriod(true);
      }
    } else {
      if (challengeVoteResult) {
        setValidationFinished(false);
        setStakingFinished(true);
      }

      setUserVote(usrVote?.vote);
      setUserStake(usrVote?.stake / 1e24);
      setStake(usrVote?.stake);
    }

    const start = nanoToMicro(period.starts_at);
    const end = nanoToMicro(period.ends_at);
    const valVote = validationVoteResult
      ? {
          ...validationVoteResult,
          starts_at: validationPeriod.starts_at,
          ends_at: validationPeriod.ends_at,
        }
      : {
          starts_at: validationPeriod.starts_at,
          ends_at: validationPeriod.ends_at,
          stake: '---',
        };

    const challVote = challengeVoteResult
      ? {
          ...challengeVoteResult,
          starts_at: challengePeriod.starts_at,
          ends_at: challengePeriod.ends_at,
        }
      : {
          starts_at: challengePeriod.starts_at,
          ends_at: challengePeriod.ends_at,
          stake: '---',
        };
    setOpenDate(start);
    setCloseDate(end);
    setTimeLeft(end - Date.now());
    setValidationVote(valVote);
    setChallengeVote(challVote);
    setAffirmed(challengeVoteResult?.approve);

    return period;
  };

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

      if (currPeriod) {
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
          const currStage = await contract.get_current_project_stage({
            project_id: data.id,
          });

          if (!currStage) return;
          setCurrentStage(currStage);
      
          const stgVoting = await contract.get_stage_voting({
            project_id: data.id,
            stage_id: currStage.id - 1,
          });
      
          if (!stgVoting) return;
          setStageVoting(stgVoting);

          // console.log(currStage, 'CURR STAGE');
          // console.log(stgVoting, 'STAGE VOTING');
          // console.log(currPeriod, 'CURR PERIOD');

          if (stgVoting?.closed) {
            const periodId = stgVoting.last_active_period;
            const lastActivePeriod = stgVoting.voting_per_period[periodId];
            return;
          }

          const periodId = stgVoting.last_active_period;
          const pastPeriods = stgVoting.voting_per_period.filter((item, id) => id < currPeriod.id);

          // console.log(pastPeriods);
    
          const allPer = await contract.get_periods_per_project_stage({
            project_id: name,
            stage_id: currStage.id - 1
          });
    
          // const currPeriod = await defineCurrentPeriod(allPer);
          // setCurrentPeriod(currPeriod);

          const challengePeriod = allPer.find(
            (item, id) => id === 1,
          );
          const validationPeriod = allPer.find(
            (item, id) => id === 0,
          );

          const challengeVoteResult = pastPeriods.find(
            (item, id) => id === 1,
          );
          const validationVoteResult = pastPeriods.find(
            (item, id) => id === 0,
          );

          // console.log(challengeVoteResult);
          // console.log(validationVoteResult);

          // const challengeVoteResult = stgVoting.voting_per_period.find(
          //   (item) => item.period_id === 1,
          // );
          // const validationVoteResult = stgVoting.voting_per_period.find(
          //   (item) => item.period_id === 0,
          // );
      
          const accountVotes = await contract.get_account_votes({
            account_id: account.accountId,
          });
      
          const usrVote = accountVotes.find(
            (item) =>
              item.project_id === data.id &&
              item.stage_id === currStage.id - 1 &&
              item.period_id === currPeriod.id,
          );

          // console.log(usrVote, 'USER VOTE');

          if (currPeriod.id >= 2 && currPeriod.id <= 4) {
            // console.log('aeaeae');
          } else {
            if (usrVote) {
              // console.log('PPPPPPPPPPPPPPPPPPPP');
              setValidationFinished(false);
              setStakingFinished(true);
            }
            setUserVote(usrVote?.vote);
            setUserStake(usrVote?.stake / 1e24);
            setStake(usrVote?.stake);
          }

          const start = nanoToMicro(currPeriod.starts_at);
          const end = nanoToMicro(currPeriod.ends_at);
          const valVote = validationVoteResult
            ? {
                ...validationVoteResult,
                starts_at: nanoToMicro(validationVoteResult.starts_at),
                ends_at: nanoToMicro(validationVoteResult.ends_at),
              }
            : {
                starts_at: nanoToMicro(validationPeriod.starts_at),
                ends_at: nanoToMicro(validationPeriod.ends_at),
                stake: '---',
              };
      
          const challVote = challengeVoteResult
            ? {
                ...challengeVoteResult,
                starts_at: nanoToMicro(challengeVoteResult.starts_at),
                ends_at: nanoToMicro(challengeVoteResult.ends_at),
              }
            : {
                starts_at: nanoToMicro(challengePeriod.starts_at),
                ends_at: nanoToMicro(challengePeriod.ends_at),
                stake: '---',
              };
          setOpenDate(start);
          setCloseDate(end);
          setTimeLeft(end - Date.now());
          setValidationVote(valVote);
          setChallengeVote(challVote);
          setAffirmed(+challengeVoteResult?.affirm_stake > +challengeVoteResult?.deny_stake);
        }

      } else if (Date.now() > data.item?.finishTimeProject) {
        // If main project time is finished and period doesn't exist
        setProjectFinished(true);
      } else {
        setTimeLeft(0);
        setEscalationPeriod(true);
        setShowPeriod(true);
        setValidationFinished(true);
        setStakingFinished(true);
        setNumOfEscalation(3);
      }

    }
    // update('loading', false);
  }, [account, data]);

  useEffect(async () => {
    let timeOut;
    if (typeof timeLeft === 'number') {
      timeOut = setTimeout(() => {
        setTimeLeft(timeLeft - oneMinute);
      }, oneMinute);
      if (timeLeft <= 0) {
        clearTimeout(timeOut);
        const currPeriod = await defineCurrentPeriod(allPeriods);
        setCurrentPeriod(currPeriod);
      }
    }
    return () => clearTimeout(timeOut);
  }, [timeLeft]);

  if (state.loading || !currentPeriod) {
    return <Loader />;
  }

  if (currentPeriod.id === 0) {
    return <span>Validation Period is not Finished</span>;
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

  // console.log(userStake);
  // console.log(userVote);

  return showPeriod ? (
    <ProjectEscalation
      data={{
        ...data,
        openDate,
        closeDate,
        timeLeft,
        validationFinished,
        stakingFinished,
        setStakingFinished,
        escalationPeriod,
        numOfEscalation,
        userStake,
        userVote,
        arrOfResolution,
        challengeVote,
        validationVote,
      }}
    />
  ) : (
    <div className="project">
      <div className="project__header">
        <div>
          <h2 className="project__header-subtitle">Project name</h2>
          <h1 className="project__header-title">{name}</h1>
        </div>
        <StageReport />
      </div>
      {!validationFinished && <StageStatus {...validationVote} />}
      <div className="project__body">
        {validationFinished ? (
          <OngoingResult
            data={{ ...data, openDate, closeDate, affirmed }}
            affirmedText="Challenge SUCCESSFUL!"
            deniedText="Challenge FAILED!"
            challengePeriod
          />
        ) : (
          <Ongoing
            data={{ ...data, timeLeft, openDate, closeDate }}
            stakingFinished={stakingFinished}
            setStakingFinished={setStakingFinished}
            title="Ongoing Challenge Window"
          />
        )}
        <div className="project__validation-info">
          {validationFinished && (
            <VoteInfo
              validationFinished={validationFinished}
              finishedTitle="Challenge Completed"
              treeHeight={0}
              growTree={randomTreeImage[1]}
              afterTree={randomTreeImage[2]}
              affirmed={affirmed}
            />
          )}
          <VoteForm
            data={{
              ...data,
              timeLeft,
              affirmed,
              stake,
              allPeriods,
              userStake,
              userVote,
              currentStage,
              currentPeriod,
            }}
            setUserVote={setUserVote}
            stakingFinished={stakingFinished}
            setStakingFinished={setStakingFinished}
            validationFinished={validationFinished}
            setEscalationPeriod={setEscalationPeriod}
            challengePeriod
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectChallenge;

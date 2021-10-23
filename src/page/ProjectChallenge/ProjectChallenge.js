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
import ValidationStats from './components/ValidationStats/ValidationStats';
import ValidationResult from './components/ValidationResult';
import PreviewReport from '../../components/PreviewReport/PreviewReport';

import fullTree1 from '../../assets/image/trees/fullTree1.svg';
import fullTree2 from '../../assets/image/trees/fullTree2.svg';
import fullTree3 from '../../assets/image/trees/fullTree3.svg';
import grownTree1 from '../../assets/image/trees/grownTree1.svg';
import grownTree2 from '../../assets/image/trees/grownTree2.svg';
import grownTree3 from '../../assets/image/trees/grownTree3.svg';
import afterTree1 from '../../assets/image/trees/afterTree1.svg';
import afterTree2 from '../../assets/image/trees/afterTree2.svg';
import afterTree3 from '../../assets/image/trees/afterTree3.svg';
import Resolution from '../../components/Resolution';
import { GAS } from '../../state/near';

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
  
  const [allVotes, setAllVotes] = useState([]);
  const [viewStageReport, setViewStageReport] = useState(false);
  const [pastPeriods, setPastPeriods] = useState([]);
  const [typeOfModal, setTypeOfModal] = useState('');
  const [showResultWindow, setShowResultWindow] = useState(false);
  const [periodsStarted, setPeriodsStarted] = useState(false);
  const [userVoteApproved, setUserVoteApproved] = useState(false);
  const [projectStarted, setProjectStarted] = useState(true);
  const [projectFinished, setProjectFinished] = useState(false);
  const [currentStage, setCurrentStage] = useState();
  const [stageVoting, setStageVoting] = useState();
  const [lastActivePeriod, setLastActivePeriod] = useState();

  const [currentPeriod, setCurrentPeriod] = useState();
  const [allPeriods, setAllPeriods] = useState();
  const [openDate, setOpenDate] = useState();
  const [showPeriod, setShowPeriod] = useState(false);
  const [closeDate, setCloseDate] = useState();
  const [timeLeft, setTimeLeft] = useState();
  const [stakingFinished, setStakingFinished] = useState(false);
  const [validationFinished, setValidationFinished] = useState();
  const [escalationPeriod, setEscalationPeriod] = useState(false);
  // const [numOfEscalation, setNumOfEscalation] = useState(0);
  const [affirmed, setAffirmed] = useState();
  const [challengeVote, setChallengeVote] = useState();
  const [validationVote, setValidationVote] = useState();
  // const [escalationVote, setEscalationVote] = useState();
  const [stake, setStake] = useState();
  const [userVote, setUserVote] = useState();
  const [userStake, setUserStake] = useState();
  const [arrOfResolution, setArrOfResolution] = useState([]);

  // const defineCurrentPeriod = async (allPer) => {
  //   const contract = getContract(account, contractMethods, 0);
  //   const period = await contract.get_current_project_period({
  //     project_id: name,
  //   });
  //   if (!period) {
  //     setTimeLeft(0);
  //     setEscalationPeriod(true);
  //     setShowPeriod(true);
  //     setValidationFinished(true);
  //     setStakingFinished(true);
  //     setNumOfEscalation(3);
  //     return {};
  //   }
  //   const projectVotes = await contract.get_project_votes({
  //     project_id: name,
  //   });

  //   const challengeVoteResult = stgVoting.voting_per_period.find(
  //     (item) => item.period_id === 1,
  //   );
  //   const validationVoteResult = stgVoting.voting_per_period.find(
  //     (item) => item.period_id === 0,
  //   );

  //   const accountVotes = await contract.get_account_votes({
  //     account_id: account.accountId,
  //   });

  //   const usrVote = accountVotes.find(
  //     (item) =>
  //       item.project_id === data.id &&
  //       item.stage_id === currStage.id - 1 &&
  //       item.period_id === currentPeriod.id,
  //   );

  //   setAllPeriods(allPer);
  //   if (period.id >= 2 && period.id <= 4) {
  //     const arrEscalPeriod = allPer.filter(
  //       (item) => item.id <= period.id,
  //     );
  //     arrEscalPeriod.splice(0, 2);

  //     const pastEscalationResults = arrEscalPeriod.map((i, index) => {
  //       const voteExist = projectVotes.find((item) => item.period_id === i.id);
  //       if (voteExist) {
  //         return { ...voteExist, starts_at: i.starts_at, ends_at: i.ends_at };
  //       }
  //       return { starts_at: i.starts_at, ends_at: i.ends_at, stake: '---' };
  //     });
  //     pastEscalationResults.pop();
  //     setArrOfResolution(pastEscalationResults);

  //     const escalationVoteResult = projectVotes.find(
  //       (item) =>
  //         item.period_id === arrEscalPeriod[arrEscalPeriod.length - 1].id,
  //     );

  //     if (escalationVoteResult) {
  //       setValidationFinished(false);
  //       setStakingFinished(true);
  //     }
  //     setEscalationVote(escalationVoteResult?.approve);
  //     setUserVote(escalationVoteResult?.approve);
  //     setUserStake(escalationVoteResult?.stake);
  //     setEscalationPeriod(true);
  //     setShowPeriod(true);
  //     // setValidationFinished(true);
  //     // setStakingFinished(false);
  //     // setTimeLeft(0);
  //     const pastEscalations = period.id >= 3 ? numOfEscalation + 1 : 0;
  //     setNumOfEscalation(pastEscalations);
  //     if (pastEscalations > 3) {
  //       setValidationFinished(true);
  //       setShowPeriod(true);
  //     }
  //   } else {
  //     if (challengeVoteResult) {
  //       setValidationFinished(false);
  //       setStakingFinished(true);
  //     }

  //     setUserVote(usrVote?.vote);
  //     setUserStake(usrVote?.stake);
  //     setStake(usrVote?.stake);
  //   }

  //   const start = nanoToMicro(period.starts_at);
  //   const end = nanoToMicro(period.ends_at);
  //   const valVote = validationVoteResult
  //     ? {
  //         ...validationVoteResult,
  //         starts_at: validationPeriod.starts_at,
  //         ends_at: validationPeriod.ends_at,
  //       }
  //     : {
  //         starts_at: validationPeriod.starts_at,
  //         ends_at: validationPeriod.ends_at,
  //         stake: '---',
  //       };

  //   const challVote = challengeVoteResult
  //     ? {
  //         ...challengeVoteResult,
  //         starts_at: challengePeriod.starts_at,
  //         ends_at: challengePeriod.ends_at,
  //       }
  //     : {
  //         starts_at: challengePeriod.starts_at,
  //         ends_at: challengePeriod.ends_at,
  //         stake: '---',
  //       };
  //   setOpenDate(start);
  //   setCloseDate(end);
  //   setTimeLeft(end - Date.now());
  //   setValidationVote(valVote);
  //   setChallengeVote(challVote);
  //   setAffirmed(challengeVoteResult?.approve);

  //   return period;
  // };

  const getResultPageInfo = async (contract, currStage, currPeriod, stgVoting) => {
    const allVotes = await contract.get_stage_voters({ project_id: `${data.id}`, stage_id: currStage.id - 1, from_index: 0, limit: 1000 });
    const lastActivePeriod = stgVoting.last_active_period;
    // const lastActivePer = stgVoting.voting_per_period[periodId];
    // setLastActivePeriod(lastActivePer);
    // console.log(stgVoting, 'STGGGGGG');
    // console.log(allVotes, 'ALL VOTES');

    const pastPer = stgVoting.voting_per_period.filter((item, id) => {
      if (lastActivePeriod !== 4) {
        return id <= lastActivePeriod + 1;
      }
      return id <= lastActivePeriod;
    });
    setShowPeriod(false);
    setValidationFinished(true);
    setAffirmed(stgVoting.total_vote);
    setPastPeriods(pastPer);
    setAllVotes(allVotes);
    setShowResultWindow(true);
    update('loading', false);
  }

  const initialFunction = async () => {
    update('loading', true);
    const contract = getContract(account, contractMethods, 0);
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

    if (currPeriod && currPeriod.id !== 0) {
      setPeriodsStarted(true);
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

        if (!currStage) {
          update('loading', false);
          return;
        }
        setCurrentStage(currStage);
    
        const stgVoting = await contract.get_stage_voting({
          project_id: data.id,
          stage_id: currStage.id - 1,
        });
    
        if (!stgVoting) {
          update('loading', false);
          return;
        }
        setStageVoting(stgVoting);

        // console.log(currStage, 'CURR STAGE');
        // console.log(stgVoting, 'STAGE VOTING');
        // console.log(currPeriod, 'CURR PERIOD');

        if (stgVoting?.closed) {
          getResultPageInfo(contract, currStage, currPeriod, stgVoting);
          return;
        }

        const periodId = stgVoting.last_active_period;
        const pastPer = stgVoting.voting_per_period.filter((item, id) => id <= currPeriod.id);
        const lastActivePer = stgVoting.voting_per_period[currPeriod.id];
        // console.log(stgVoting.voting_per_period);
        // console.log(lastActivePer, 'ADASDASDASDASDASDASDASD');
  
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

        const challengeVoteResult = pastPer.find(
          (item, id) => id === 1,
        );
        const validationVoteResult = pastPer.find(
          (item, id) => id === 0,
        );

        // console.log(pastPer, 'PAST');
        // console.log(challengeVoteResult, 'CHALL');
        // console.log(validationVoteResult, 'VAL');

        // const challengeVoteResult = stgVoting.voting_per_period.find(
        //   (item) => item.period_id === 1,
        // );
        // const validationVoteResult = stgVoting.voting_per_period.find(
        //   (item) => item.period_id === 0,
        // );
    
        const accountVotes = await contract.get_account_votes({
          account_id: account.accountId,
        });

        // console.log(accountVotes, 'ACCOUNT VOTES');
    
        const usrVote = accountVotes.find(
          (item) =>
            item.project_id === data.id &&
            item.stage_id === currStage.id - 1 &&
            item.period_id === currPeriod.id,
        );

        const validVote = accountVotes.find(
          (item) =>
            item.project_id === data.id &&
            item.stage_id === currStage.id - 1 &&
            item.period_id === 0,
        );

        // console.log(validVote, 'QQQQQQQQQQQ');

        // console.log(usrVote, 'USER VOTE');

        if (currPeriod.id >= 2 && currPeriod.id <= 4) {
          // const arrEscalPeriod = pastPer;
  
          // console.log(pastPer, 'PAST PERRRRRRRRR');
          const pastResults = pastPer.map((i, index) => {
            const voteExist = accountVotes.find(
              (item) => 
                item.project_id === data.id &&
                item.stage_id === currStage.id - 1 &&
                item.period_id === index &&
                item.approved,
            );
            const stake = voteExist?.stake ? voteExist.stake : '---';
            const votersNumber = i.deny_number + i.affirm_number;
            const prevVote = pastPer[index + 1]?.prev_vote;
            return { votersNumber, stake, prevVote, starts_at: nanoToMicro(i.starts_at), ends_at: nanoToMicro(i.ends_at) };
          });
          pastResults.pop();
          setArrOfResolution(pastResults);
    
          // const escalationVoteResult = stgVoting.voting_per_period.find(
          //   (item, index) =>
          //     index === arrEscalPeriod[arrEscalPeriod.length - 1].id,
          // );

          // const userVote = accountVotes.find(
          //   (item) =>
          //     item.project_id === data.id &&
          //     item.stage_id === currStage.id - 1 &&
          //     item.period_id === currPeriod.id,
          // );
          // console.log(usrVote, 'USER VOTE');
    
          if (usrVote) {
            setValidationFinished(false);
            setStakingFinished(true);
            setUserVoteApproved(usrVote?.approved);
          } else {
            setStakingFinished(false);
          }
          // setEscalationVote(+escalationVoteResult?.affirm_stake > +escalationVoteResult?.deny_stake);
          setUserVote(usrVote?.vote);
          setUserStake(usrVote?.stake);
          setEscalationPeriod(true);
          setShowPeriod(true);
          // setValidationFinished(true);
          // setStakingFinished(false);
          // setTimeLeft(0);
        } else {
          if (usrVote) {
            // console.log('PPPPPPPPPPPPPPPPPPPP');
            setValidationFinished(false);
            setStakingFinished(true);
            setUserVoteApproved(usrVote?.approved);
          }
          setUserVote(usrVote?.vote);
          setUserStake(usrVote?.stake);
          setStake(usrVote?.stake);
          setUserVoteApproved(usrVote?.approved);
        }

        // console.log(lastActivePer, 'LAST ACTIVE PER');

        const start = nanoToMicro(currPeriod.starts_at);
        const end = nanoToMicro(currPeriod.ends_at);
        const valVote = {
          ...validationVoteResult,
          starts_at: nanoToMicro(validationVoteResult.starts_at),
          ends_at: nanoToMicro(validationVoteResult.ends_at),
          stake: validVote ? validVote.stake : '---',
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
        setLastActivePeriod(lastActivePer);
      }

    } else if (Date.now() > data.item?.finishTimeProject) {
      // If main project time is finished and period doesn't exist
      setProjectFinished(true);
      update('loading', false);
      return
    } else {
      setPeriodsStarted(false);
      update('loading', false);
      // setTimeLeft(0);
      // setEscalationPeriod(true);
      // setShowPeriod(true);
      // setValidationFinished(true);
      // setStakingFinished(true);
      // setNumOfEscalation(3);
    }
    update('loading', false);
  };

  const claimReward = async (stageId) => {
    update('loading', true);
    const deposit = '1';
    const contract = getContract(account, contractMethods, 0);
    await contract.claim_reward(
      {
        project_id: data.id,
        stage_id: stageId,
      },
      GAS,
      deposit,
    );
    update('loading', false);
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
        } else {
          return;
        }
      }

      await initialFunction();

    }
    update('loading', false);
  }, [account, data]);

  useEffect(async () => {
    let timeOut;
    if (typeof timeLeft === 'number') {
      timeOut = setTimeout(() => {
        setTimeLeft(timeLeft - oneMinute);
      }, oneMinute);
      if (timeLeft <= 0) {
        clearTimeout(timeOut);
        // const currPeriod = await defineCurrentPeriod(allPeriods);
        // setCurrentPeriod(currPeriod);
        await initialFunction();
      }
    }
    return () => clearTimeout(timeOut);
  }, [timeLeft]);

  if (state.loading) {
    return <div className="loader-wrapper"><Loader /></div>;
  }

  if (currentPeriod && currentPeriod.id === 0) {
    return <div className="loader-wrapper"><span>Validation Period is not Finished</span></div>;
  }

  if (!projectStarted) {
    return <div className="loader-wrapper"><span>Project has&apos;t started yet.</span></div>;
  }

  if (projectFinished) {
    return <div className="loader-wrapper"><span>Project was finished.</span></div>;
  }

  if (!periodsStarted) {
    return <div className="loader-wrapper"><span>Voting per stage will start soon.</span></div>;
  }

  // if (currentStage === null) {
  //   return <span>Stage has&apos;t started yet.</span>;
  // }

  if (!currentStage) {
    return <div className="loader-wrapper"><span>Stage has&apos;t started yet.</span></div>;
  }

  if (stageVoting === null || !stageVoting?.approved) {
    return <div className="loader-wrapper"><span>No voting per stage yet.</span></div>;
  }

  // if (currentPeriod.id >= 2) {
  //   return <span>Escalation will be soon</span>
  // }

  // console.log(stageVoting, 'ASDASDASDASDASDASD');

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
        // numOfEscalation,
        userStake,
        userVote,
        arrOfResolution,
        challengeVote,
        validationVote,
        userVoteApproved,
        currentStage,
        lastActivePeriod,
        currentPeriod,
      }}
    />
  ) : (
    <div className="project">
      <div className="project__header">
        <div>
          <h2 className="project__header-subtitle">Project name</h2>
          <h1 className="project__header-title">{data.item.name}</h1>
        </div>
        <StageReport setViewStageReport={setViewStageReport} />
      </div>
      {viewStageReport && (
        <PreviewReport
          setViewStageReport={setViewStageReport}
          totalData={data.item}
          currentStage={currentStage}
        />
      )}
      {showResultWindow ? (
        <>
          {typeOfModal ? (
            <ValidationStats
              projectName={data.item.name}
              projectId={data.id}
              pastPeriods={pastPeriods}
              typeOfModal={typeOfModal}
              setTypeOfModal={setTypeOfModal}
              allVotes={allVotes}
              stageVoting={stageVoting}
              claimReward={claimReward}
              currentStage={currentStage}
              affirmed={affirmed}
            />
          ) : (
            <div className="project__body">
              <div className="project__validation-info">
                {validationFinished && (
                  <VoteInfo
                    validationFinished={validationFinished}
                    finishedTitle="Stage Report Validated!"
                    treeHeight={0}
                    growTree={randomTreeImage[1]}
                    afterTree={randomTreeImage[2]}
                    affirmed={affirmed}
                  />
                )}
                <OngoingResult
                  data={{ ...data, affirmed }}
                  affirmedText="Resolution: AFFIRMED!"
                  deniedText="Resolution: DENIED"
                  escalationPeriod
                  setTypeOfModal={setTypeOfModal}
                />
              </div>
              <ValidationResult pastPeriods={pastPeriods} setTypeOfModal={setTypeOfModal} />
            </div>
          )}
        </>
      ) : (
        <>
          {!validationFinished && <StageStatus {...validationVote} prevVote={lastActivePeriod?.prev_vote} />}
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
                  // validationVote,
                  lastActivePeriod,
                  userVoteApproved,
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
        </>
      )}

    </div>
  );
};

export default ProjectChallenge;

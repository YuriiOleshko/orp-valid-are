/* eslint-disable */
import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import InfiniteScroll from './components/InfinitiScroll';
import Range from './components/Range';
import pic1 from '../../assets/image/trees/tree1.svg';
import pic2 from '../../assets/image/trees/tree2.svg';
import pic3 from '../../assets/image/trees/tree3.svg';
import pic4 from '../../assets/image/trees/tree4.svg';
import pic5 from '../../assets/image/trees/tree5.svg';
import pic6 from '../../assets/image/trees/tree6.svg';
import pic7 from '../../assets/image/trees/tree7.svg';
import pic8 from '../../assets/image/trees/tree8.svg';
import pic9 from '../../assets/image/trees/tree9.svg';
import pic10 from '../../assets/image/trees/tree10.svg';
import Loader from '../../components/Loader';
import { appStore } from '../../state/app';
import { formattedDate } from '../../utils/convert-utils';
const arrayTrees = [
  pic1,
  pic2,
  pic3,
  pic4,
  pic5,
  pic6,
  pic7,
  pic8,
  pic9,
  pic10,
];

const INDEXER_API = process.env.REACT_APP_INDEXER_API;

const Timeline = () => {
  const { state, update } = useContext(appStore);
  const { app } = state;
  const [values, setValues] = useState([50]);
  const [currentlyTrees, setCurrentlyTrees] = useState(0);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [bodyReq, setBodyReq] = useState({
    from: 0,
    size: 30,
    sort: [{ startTimeProject: 'asc' }],
    query: {
      match_all: {},
    },
  });

  const defineProjectInfo = (project, currStg, targetStg, prevStgId) => {
    let currentStage;
    let periodOpen;
    let dataUpload;
    let fee;
    let img;
    let projectName;
    const now = Date.now() * 1e6;
    const targetPeriod = targetStg.periods.find((per) => per.starts_at <= now && per.ends_at >= now);
    const currentDataUpload = project.subZonesPolygon?.find(
      (sub) => sub.stage === prevStgId,
    );
    currentStage = currStg.id;
    dataUpload = currentDataUpload?.dataUploadTime ? formattedDate(currentDataUpload?.dataUploadTime, '.') : '---';
    periodOpen = `
    ${targetPeriod ? formattedDate(targetPeriod.starts_at / 1e6, '.') : '---' }
    /
    ${targetPeriod ? formattedDate(targetPeriod.ends_at / 1e6, '.') : '---'}
    `;
    fee = `${currStg.fee} $`;
    img = arrayTrees[Math.floor(Math.random() * 10)];
    projectName = project.name;
    return { ...project, img, project: projectName, du: dataUpload, us: currentStage, uf: fee, valid: periodOpen };
  };

  const loadProjectsPOST = async (body, loadMore) => {
    try {
      const projects = await fetch(INDEXER_API, {
        method: 'POST',
        body: JSON.stringify(body),
      }).then((data) => data.json());

      const now = Date.now() * 1e6;

      // if (!projects) return;

      // const projectsWithExistStage = (projects || []).filter((item) => {
      //   const currStage = item.stages.find(
      //     (stg) => stg.starts_at <= now && stg.ends_at >= now,
      //   );
      //   if (currStage) {
      //     return true;
      //   } else {
      //     const lastStage = item.stages[item.stages.length - 1];
      //     const checkIfPeriodExist = lastStage.periods.find((per) => per.starts_at <= now && per.ends_at >= now);
      //     if (checkIfPeriodExist) return true;
      //     else return false;
      //   }
      // });

      const parsedProjects = (projects || []).map((item) => {
        const currStage = item.stages.find(
          (stg) => stg.starts_at <= now && stg.ends_at >= now,
        );
        if (!currStage) {
          const lastStage = item.stages[item.stages.length - 1];
          return defineProjectInfo(item, lastStage, lastStage, lastStage.id);
        }
        if (currStage?.id === 0) {
          return defineProjectInfo(item, currStage, currStage, 0)
        }
        if (currStage?.id >= 1) {
          return defineProjectInfo(item, currStage, item.stages[currStage.id - 1], currStage.id - 1);
        }
      });

      if (loadMore) {
        const copyNft = [...app.timelineNft];
        copyNft.push(...parsedProjects);
        update('app.timelineNft', copyNft);
      } else {
        update('app.timelineNft', parsedProjects);
      }
      setErr(false);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setErr(true);
      setLoading(false);
    }
  };

  const calcCurrentTree = (rangeValue, genWidth, genScroll, elemWidth) => {
    const currentTree = Math.floor(
      (rangeValue * (genWidth / 100) + genScroll) / elemWidth,
    );
    if (!(currentlyTrees === currentTree)) {
      setValues(rangeValue);
      setCurrentlyTrees(currentTree);
    }
  };
  const fetchMoreData = async () => {
    const copyBodyReq = { ...bodyReq };
    copyBodyReq.from = app.timelineNft.length;
    await loadProjectsPOST(copyBodyReq, true);
  };

  useEffect(async () => {
    await loadProjectsPOST(bodyReq, false);
  }, []);

  return (
    <div className="timeline">
      {loading || err ? (
        <div className="validation__loader">
          <Loader />
        </div>
      ) : (
        <>
          {app?.timelineNft.length ? (
            <>
              <InfiniteScroll
                rangeValue={values}
                currentlyTrees={currentlyTrees}
                calcCurrentTree={calcCurrentTree}
                items={app.timelineNft}
                resFunc={fetchMoreData}
              />
              <Range
                items={app.timelineNft}
                currentlyTrees={currentlyTrees}
                calcCurrentTree={calcCurrentTree}
              />
            </>
          ) : (
            <span>No projects</span>
          )}
        </>
      )}
    </div>
  );
};

export default Timeline;

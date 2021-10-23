/* eslint-disable no-unused-vars */
/* eslint-disable */
import React, { useContext, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { appStore } from '../../state/app';
import { getContract, contractMethods } from '../../utils/near-utils';
import { initIPFS, getJSONFileFromIpfs } from '../../state/ipfs';

import CustomBtn from '../../components/generic/CustomBtn';
import ExistingProjects from '../../components/ExistingProjects';
import Filter from './Filter';
import Loader from '../../components/Loader';
import { btnLoad } from './LangValidationData';
import { nanoToMicro } from '../../utils/convert-utils';
import Page from '../../context';

// {
//   "query": {
//     "multi_match": {
//         "query" : "Jonglei, South Sudan 555444"
//         , "fields": ["region","budget"]
//     }
//   }
// }

// {
//   "query": {
//       "range" : {
//           "experience" : {
//               "gte" : 5,
//               "lte" : 10
//           }
//       }
//   }
// }

// {
//   "query": {
//     "query_string": {
//       "query": "(budget: 555444) OR (region: Ukraine)"
//     }
//   }
// }

const INDEXER_API = process.env.REACT_APP_INDEXER_API;

const ValidationData = () => {
  const intl = useIntl();
  const { state, update } = useContext(appStore);
  const page = useContext(Page);
  const { account, app } = state;
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [filterParams, setFilterParams] = useState({
    from: 0, size: 10,
    query: {
      match_all: {}
    }
  });

  // const loadTokens = async () => {
  //   // if (app.nftTokens.length) return;
  //   // const ipfs = await initIPFS();
  //   // const contract = getContract(account, contractMethods, 0);
  //   // let tokenIds = [];

  //   try {
  //     // tokenIds = await contract.get_account_projects({
  //     //   account_id: account.accountId,
  //     //   from_index: 0,
  //     //   limit: 30,
  //     // });
  //     // if (tokenIds.length === 0) {
  //     //   return;
  //     // }

  //     // // Get all files saved to ipfs for each nft token
  //     // const data = await Promise.all(
  //     //   tokenIds.map(async (token) => {
  //     //     const item = await getJSONFileFromIpfs(ipfs, token.info.cid);
  //     //     return {
  //     //       id: token.token_id,
  //     //       item,
  //     //     };
  //     //   }),
  //     // );
  //     // update('app.nftTokens', data);
  //   } catch (e) {
  //     //setErr(true);
  //   }
  // };

  const loadProjectsGET = async (offset) => {
    try {
      const offSet = offset ? `&offset=${offset}` : '';
      const projects = await fetch(`${INDEXER_API}?limit=5${offSet}`).then((data) => data.json());

      if (!projects) return;

      const parsedProjects = projects.map((item) => ({ id: item.project_id, item }));
      const copyNft = [...app.nftTokens];
      copyNft.push(...parsedProjects)
      update('app.nftTokens', copyNft);
    } catch (e) {
      console.log(e)
      setErr(true);
    }    
  };

  const loadProjectsPOST = async (body, loadMore) => {
    try {
      const projects = await fetch(INDEXER_API, {
        method: 'POST',
        body: JSON.stringify(body),
      }).then((data) => data.json());

      let filteredProjects = [];
      const now = Date.now() * 1e6;

      // console.log(projects);

      // if (!projects) return;

      const parsedProjects = (projects || []).map((item) => ({ id: item.project_id, item }));

      if (page === 'data-uploads') {
        filteredProjects = parsedProjects.filter((proj) => {
          const currStage = proj.item.stages.find((stg) => stg.starts_at <= now && stg.ends_at >= now);
          if (currStage) {
            return true;
          } else {
            const lastStage = proj.item.stages[proj.item.stages.length - 1];
            const checkIfPeriodExist = lastStage.periods.find((per) => per.starts_at <= now && per.ends_at >= now);
            if (checkIfPeriodExist) return true;
            else return false;
          }
        });
      } else if (page === 'challenges') {
        filteredProjects = parsedProjects.filter((proj) => {
          const currStage = proj.item.stages.find((stg) => stg.starts_at <= now && stg.ends_at >= now);
          if (currStage) {
            if (currStage.id >= 1) {
              // const currPeriod = proj.item.stages[currStage.id - 1].periods.find((per) => per.starts_at <= now && per.ends_at >= now);
              return true;
            } else {
              return false;
            }
          } else {
            const lastStage = proj.item.stages[proj.item.stages.length - 1];
            const checkIfPeriodExist = lastStage.periods.find((per) => per.starts_at <= now && per.ends_at >= now);
            return true;
          }
        });
      }

      if (loadMore) {
        const copyNft = [...app.nftTokens];
        copyNft.push(...filteredProjects)
        update('app.nftTokens', copyNft);
      } else {
        update('app.nftTokens', filteredProjects);
      }
      setErr(false);
      setLoading(false);
    } catch (e) {
      console.log(e)
      setErr(true);
      setLoading(false);
    }    
  };

  async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      // mode: 'no-cors', // no-cors, *cors, same-origin
      // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return await response.json(); // parses JSON response into native JavaScript objects
  }

  const body = {
    sort: [{ startTimeProject: 'asc' }],
    query: {
      match_all: {},
    },
  };

  // useEffect(async () => {
  //   postData(
  //     'http://ec2-3-70-19-33.eu-central-1.compute.amazonaws.com/projects',
  //     body,
  //   ).then((data) => {
  //     console.log(data); // JSON data parsed by `response.json()` call
  //   });
  // }, []);

  useEffect(async () => {
    await loadProjectsPOST(filterParams, false);
  }, [filterParams]);

  return (
    <div className="validation">
      {err && <div className="validation__error">Error, try later</div>}
      {loading ? (
        <div className="validation__loader">
          <Loader />
        </div>
      ) : (
        <>
          <div className="validation__filter">
            <Filter setFilterParams={setFilterParams} />
          </div>
          {app?.nftTokens.length ? (
            <>
              <div className="validation__data">
                <ExistingProjects data={app.nftTokens} />
              </div>
              <div className="validation__btn">
                <CustomBtn
                  label={intl.formatMessage(btnLoad)}
                  handleClick={() => {
                    const copyFilterParams = { ...filterParams };
                    copyFilterParams.from = app.nftTokens.length;
                    loadProjectsPOST(copyFilterParams, true);
                  }}
                  customClass="btn__load"
                />
              </div>
            </>
          ) : (
            <span>No project</span>
          )}
        </>
      )}
    </div>
  );
};

export default ValidationData;

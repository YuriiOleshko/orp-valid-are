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
import Page from '../../utils/context';

const INDEXER_API = process.env.REACT_APP_INDEXER_API;

const ValidationData = () => {
  const intl = useIntl();
  const { state, update } = useContext(appStore);
  const page = useContext(Page);
  const { account, app } = state;
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [filterParams, setFilterParams] = useState({
    from: 0, size: 30,
    query: {
      match_all: {}
    }
  });

  const loadProjectsPOST = async (body, loadMore) => {
    try {
      const projects = await fetch(INDEXER_API, {
        method: 'POST',
        body: JSON.stringify(body),
      }).then((data) => data.json());

      let filteredProjects = [];
      const now = Date.now() * 1e6;

      // if (!projects) return;

      const parsedProjects = (projects || []).map((item) => ({ id: item.project_id, item }));

      if (page === 'data-uploads') {
        filteredProjects = parsedProjects;
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

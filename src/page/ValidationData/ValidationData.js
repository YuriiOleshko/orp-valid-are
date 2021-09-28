/* eslint-disable no-unused-vars */
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

const ValidationData = () => {
  const intl = useIntl();
  const { state, update } = useContext(appStore);
  const { account, app } = state;
  const [err, setErr] = useState(false);

  const loadTokens = async () => {
    const ipfs = await initIPFS();
    const contract = getContract(account, contractMethods, 0);
    let tokenIds = [];

    try {
      tokenIds = await contract.get_account_projects({
        account_id: account.accountId,
        from_index: 0,
        limit: 30,
      });
      if (tokenIds.length === 0) {
        return;
      }

      // Get all files saved to ipfs for each nft token
      const data = await Promise.all(
        tokenIds.map(async (token) => {
          const item = await getJSONFileFromIpfs(ipfs, token.info.cid);
          return {
            id: token.token_id,
            item,
          };
        }),
      );
      update('app.nftTokens', data);
    } catch (e) {
      setErr(true);
    }
  };

  useEffect(async () => {
    if (account && account.accountId) await loadTokens();
  }, [account]);

  return (
    <div className="validation">
      {err && <div className="validation__error">IPFS Error</div>}
      {app?.nftTokens.length ? (
        <>
          <div className="validation__filter">
            <Filter />
          </div>
          <div className="validation__data">
            <ExistingProjects data={app.nftTokens} />
          </div>
          <div className="validation__btn">
            <CustomBtn
              label={intl.formatMessage(btnLoad)}
              handleClick={() => {}}
              customClass="btn__load"
            />
          </div>
        </>
      ) : (
        <div className="validation__loader">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default ValidationData;

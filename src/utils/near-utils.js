/* eslint-disable */
import * as nearAPI from 'near-api-js';
import getConfig from '../config';

export const {
  networkId,
  nodeUrl,
  walletUrl,
  contractName,
  contractMethods,
  marketDeposit,
} = getConfig();

const { Account, Contract } = nearAPI;

export const formatAccountId = (accountId, len = 16) => {
  if (accountId.length > len) {
    return `${accountId.substr(0, len - 3)}...`;
  }
  return accountId;
};

export const getContract = (account, methods = contractMethods, contractId) => {
  return new nearAPI.Contract(account, contractName[contractId], {
    ...methods,
    sender: account.accountId,
  });
};

export const getWallet = async () => {
  const near = await nearAPI.connect({
    networkId,
    nodeUrl,
    walletUrl,
    deps: { keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore() },
  });
  const wallet = new nearAPI.WalletAccount(near);
  const contractAccount = new Account(near.connection, contractName);
  return { near, wallet, contractAccount };
};

export const getSignature = async (account) => {
  const { accountId } = account;
  const block = await account.connection.provider.block({ finality: 'final' });
  const blockNumber = block.header.height.toString();
  const signer = account.inMemorySigner || account.connection.signer;
  const signed = await signer.signMessage(
    Buffer.from(blockNumber),
    accountId,
    networkId,
  );
  const blockNumberSignature = Buffer.from(signed.signature).toString('base64');
  return { blockNumber, blockNumberSignature };
};

export const postSignedJson = async ({
  account,
  contractNameCurrent,
  url,
  data = {},
}) => {
  // Debugging
  // console.log('postSignedJson', account, contractNameCurrent, data)
  // Need to check
  return await fetch(url, {
    method: 'POST',
    headers: new Headers({ 'content-type': 'application/json' }),
    body: JSON.stringify({
      ...data,
      accountId: account.accountId,
      contractName: contractNameCurrent,
      ...(await getSignature(account)),
    }),
  }).then((res) => res.json());
};

export const postJson = async ({ url, data = {} }) => {
  return await fetch(url, {
    method: 'POST',
    headers: new Headers({ 'content-type': 'application/json' }),
    body: JSON.stringify({ ...data }),
  }).then((res) => res.json());
};

// Guest Account
// export const createGuestAccount = (near, key) => {
//   key.toString = () => key.secretKey;
//   near.connection.signer.keyStore.setKey(networkId, 'guests.' + contractName, key);
//   const account = new Account(near.connection, 'guests.' + contractName);
//   return account;
// };

// Key for Guest Account
// export const createAccessKeyAccount = (near, key) => {
//   key.toString = () => key.secretKey;
//   near.connection.signer.keyStore.setKey(networkId, contractName, key);
//   const account = new Account(near.connection, contractName);
//   return account;
// };

// Not used currently

// export const hasKey = async (near, accountId, publicKey) => {
//   const pubKeyStr = publicKey.toString();
//   const account = new nearAPI.Account(near.connection, accountId);
//   try {
//     const accessKeys = await account.getAccessKeys();
//     if (accessKeys.length > 0 && accessKeys.find(({ public_key }) => public_key === pubKeyStr)) {
//       return true;
//     }
//   } catch (e) {
//     console.warn(e);
//   }
//   return false;
// };

// export const isAccountTaken = async (near, accountId) => {
//   if (accountId.indexOf(nameSuffix) > -1) {
//     return true;
//   }
//   accountId = accountId + nameSuffix;
//   const account = new nearAPI.Account(near.connection, accountId);
//   try {
//     await account.state();
//     return true;
//   } catch (e) {
//     if (!/does not exist/.test(e.toString())) {
//       throw e;
//     }
//   }
//   return false;
// };

// export const getContractSigner = async ({ keyPair }) => {
//   const signer = await InMemorySigner.fromKeyPair(networkId, contractName, keyPair);
//   const near = await nearAPI.connect({
//     networkId, nodeUrl, walletUrl, deps: { keyStore: signer.keyStore },
//   });
//   const account = new nearAPI.Account(near.connection, contractName);
//   const contract = await new nearAPI.Contract(account, contractName, {
//     changeMethods: ['send', 'claim', 'create_account_and_claim'],
//     sender: account,
//   });
//   return { contract };
// };

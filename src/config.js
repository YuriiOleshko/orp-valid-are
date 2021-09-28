const contractName = process.env.REACT_APP_CONTRACT_NAME || [
  'core.ofp.testnet',
  'dai.ofp.testnet',
  'opn.ofp.testnet',
];
const IPFS_URL = process.env.REACT_APP_IPFS_URL || 'https://gateway.ipfs.io';

export default function getConfig() {
  let config = {
    ipfsURL: IPFS_URL,
    networkId: 'default',
    nodeUrl: 'https://rpc.testnet.near.org',
    walletUrl: 'https://wallet.testnet.near.org',
    helperUrl: 'https://helper.testnet.near.org',
    contractName,
    GAS: '200000000000000',
    DEFAULT_NEW_ACCOUNT_AMOUNT: '5',
    // contractMethods: {
    //   changeMethods: ['vote', 'revoke'],
    //   viewMethods: [
    //     'get_profile',
    //     'get_project',
    //     'get_projects_per_account',
    //     'get_current_project_period',
    //     'get_periods_per_project',
    //     'calculate_project_periods',
    //     'get_project_votes',
    //     'get_account_votes',
    //     'get_current_project_stage',
    //   ],
    // },
    contractMethods: {
      changeMethods: ['add_vote', 'revoke_vote', 'claim_reward'],
      viewMethods: [
        'get_profile',

        'get_project',
        'get_account_projects',

        'get_current_project_period',
        'get_periods_per_project_stage',
        'get_project_stages',

        'get_account_votes',
        'get_current_project_stage',

        'get_stage_voting',
        'get_stage_voters',
      ],
    },
  };

  if (process.env.REACT_APP_ENV === 'prod') {
    config = {
      ...config,
      networkId: 'mainnet',
      nodeUrl: 'https://rpc.mainnet.near.org',
      walletUrl: 'https://wallet.near.org',
      helperUrl: 'https://helper.mainnet.near.org',
      contractName: 'near',
    };
  }

  return config;
}

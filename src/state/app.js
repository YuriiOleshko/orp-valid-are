/* eslint-disable */
import { StateUtils } from '../utils/state-utils';
import { initNear } from './near';

const initialState = {
  app: {
    theme: localStorage.getItem('theme')
      ? localStorage.getItem('theme')
      : 'light',
    profile: null,
    profileProject: {},
    nftTokens: [],
  },
  near: {
    initialized: false,
  },
};

export const { appStore, AppProvider } = StateUtils(initialState, 'app');

export const onAppMount =
  () =>
  async ({ dispatch }) => {
    document.documentElement.classList.add(`theme-${initialState.app.theme}`);
    dispatch(initNear());
  };

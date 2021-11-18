/* eslint-disable */
import React, { createContext } from 'react';
import { Redirect } from 'react-router';
import * as nearAPI from 'near-api-js';
import Layout from './Layouts/Layout';
import LayoutDash from './Layouts/LayoutDash';
import ProjectValidation from './page/ProjectValidation';
import RenderRoutes from './components/RenderRoutes';
import Timeline from './page/Timeline';
import ValidationData from './page/ValidationData';
import ProjectChallenge from './page/ProjectChallenge';
import CreateAcc from './page/CreateAcc';
import Login from './page/Login';
import Page from './utils/context';

const routes = [
  {
    path: '/login',
    key: 'ROOT',
    exact: true,
    component: () => <Login />,
  },
  {
    path: '/create-account',
    key: 'CREATE_ACC',
    exact: true,
    component: () => <CreateAcc />,
  },
  {
    path: '/',
    key: 'TIMELINE',
    exact: true,
    component: () => (
      <Layout>
        <Timeline />
      </Layout>
    ),
  },
  {
    path: '/data-uploads',
    key: 'DATA_UPLOADS',
    exact: true,
    component: () => (
      <Layout>
        <Page.Provider value="data-uploads">
          <ValidationData />
        </Page.Provider>
      </Layout>
    ),
  },
  {
    path: '/challenges',
    key: 'CHALLENGES',
    exact: true,
    component: () => (
      <Layout>
        <Page.Provider value="challenges">
          <ValidationData />
        </Page.Provider>
      </Layout>
    ),
  },
  {
    path: '/project/validation/:name',
    key: 'PROJECT',
    exact: true,
    component: () => {
      const keys = new nearAPI.keyStores.BrowserLocalStorageKeyStore();
      if (keys.localStorage.length === 0) {
        return <Redirect to="/login" />;
      }
      return (
        <LayoutDash>
          <ProjectValidation />
        </LayoutDash>
      );
    },
  },
  {
    path: '/project/challenge/:name',
    key: 'PROJECT',
    exact: true,
    component: () => {
      const keys = new nearAPI.keyStores.BrowserLocalStorageKeyStore();
      if (keys.localStorage.length === 0) {
        return <Redirect to="/login" />;
      }
      return (
        <LayoutDash>
          <ProjectChallenge />
        </LayoutDash>
      );
    },
  },
];

export { Page };
export default routes;

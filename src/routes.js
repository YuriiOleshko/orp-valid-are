import React, { createContext } from 'react';
import { Redirect } from 'react-router';
import Layout from './Layouts/Layout';
import LayoutDash from './Layouts/LayoutDash';
import ProjectValidation from './page/ProjectValidation';
import RenderRoutes from './components/RenderRoutes';
import Timeline from './page/Timeline';
import ValidationData from './page/ValidationData';
import ProjectChallenge from './page/ProjectChallenge';

const Page = createContext();
const logged = true;
const routes = [
  {
    path: '/login',
    key: 'LOGIN',
    exact: true,
    component: () => {
      if (logged) {
        return <Redirect to="/" />;
      }
      return <h1>Login Page</h1>;
    },
  },
  {
    path: '/',
    key: 'HOME',
    component: (props) => {
      if (logged) {
        return <RenderRoutes {...props} />;
      }
      return <Redirect to="/login" />;
    },
    routes: [
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
        component: () => (
          <LayoutDash>
            <ProjectValidation />
          </LayoutDash>
        ),
      },
      {
        path: '/project/challenge/:name',
        key: 'PROJECT',
        exact: true,
        component: () => (
          <LayoutDash>
            <ProjectChallenge />
          </LayoutDash>
        ),
      },
    ],
  },
];

export { Page };
export default routes;

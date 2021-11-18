/* eslint-disable react/prop-types */
import React from 'react';
// import { Page } from '../../routes';
import ExistingProjectsHeader from './components/ExistingProjectsHeader';
import ExistingProjectsList from './components/ExistingProjectsList';

const ExistingProjects = ({ data }) => (
  // const page = useContext(Page);
  <>
    <ExistingProjectsHeader />
    <ExistingProjectsList data={data} />
  </>
);
export default ExistingProjects;

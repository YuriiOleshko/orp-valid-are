import React, { useContext } from 'react';
import { Page } from '../../routes';
import ExistingProjectsHeader from '../ExistingProjectsHeader';
import ExistingProjectsList from '../ExistingProjectsList';

const ExistingProjects = () => {
  const page = useContext(Page);
  const uploadArr = [
    {
      status: 'completed',
      name: 'My forest',
      dataUpload: '05.08.21',
      stage: 12,
      validOpen: '11.12.21 / 1.04.22',
      area: 167.98,
      location: 'California, USA',
    },
    {
      status: 'pending',
      name: 'My forest',
      dataUpload: '05.08.21',
      stage: 12,
      validOpen: '11.12.21 / 1.04.22',
      area: 167.98,
      location: 'California, USA',
    },
    {
      status: 'open',
      name: 'My forest',
      dataUpload: '05.08.21',
      stage: 12,
      validOpen: '11.12.21 / 1.04.22',
      area: 167.98,
      location: 'California, USA',
    },
    {
      status: 'completed',
      name: 'My forest',
      dataUpload: '05.08.21',
      stage: 12,
      validOpen: '11.12.21 / 1.04.22',
      area: 167.98,
      location: 'California, USA',
    },
    {
      status: 'pending',
      name: 'My forest',
      dataUpload: '05.08.21',
      stage: 12,
      validOpen: '11.12.21 / 1.04.22',
      area: 167.98,
      location: 'California, USA',
    },
    {
      status: 'open',
      name: 'My forest',
      dataUpload: '05.08.21',
      stage: 12,
      validOpen: '11.12.21 / 1.04.22',
      area: 167.98,
      location: 'California, USA',
    },
    {
      status: 'completed',
      name: 'My forest',
      dataUpload: '05.08.21',
      stage: 12,
      validOpen: '11.12.21 / 1.04.22',
      area: 167.98,
      location: 'California, USA',
    },
  ];
  const challengeArr = [
    {
      status: 'resolved',
      name: 'My forest',
      dataUpload: '05.08.21',
      stage: 12,
      validOpen: '11.12.21 / 1.04.22',
      area: 167.98,
      location: 'California, USA',
    },
    {
      status: 'open',
      name: 'My forest',
      dataUpload: '05.08.21',
      stage: 12,
      validOpen: '11.12.21 / 1.04.22',
      area: 167.98,
      location: 'California, USA',
    },
    {
      status: 'resolved',
      name: 'My forest',
      dataUpload: '05.08.21',
      stage: 12,
      validOpen: '11.12.21 / 1.04.22',
      area: 167.98,
      location: 'California, USA',
    },
    {
      status: 'open',
      name: 'My forest',
      dataUpload: '05.08.21',
      stage: 12,
      validOpen: '11.12.21 / 1.04.22',
      area: 167.98,
      location: 'California, USA',
    },
    {
      status: 'open',
      name: 'My forest',
      dataUpload: '05.08.21',
      stage: 12,
      validOpen: '11.12.21 / 1.04.22',
      area: 167.98,
      location: 'California, USA',
    },
    {
      status: 'resolved',
      name: 'My forest',
      dataUpload: '05.08.21',
      stage: 12,
      validOpen: '11.12.21 / 1.04.22',
      area: 167.98,
      location: 'California, USA',
    },
  ];
  return (
    <>
      <ExistingProjectsHeader />
      <ExistingProjectsList
        data={page === 'data-uploads' ? uploadArr : challengeArr}
      />
    </>
  );
};

export default ExistingProjects;

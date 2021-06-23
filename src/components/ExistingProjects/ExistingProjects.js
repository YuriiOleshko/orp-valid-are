import React, { useContext } from 'react';
import { Page } from '../../routes';
import ExistingProjectsHeader from './components/ExistingProjectsHeader';
import ExistingProjectsList from './components/ExistingProjectsList';

const ExistingProjects = () => {
  const page = useContext(Page);
  const uploadArr = [
    {
      status: 'completed',
      name: 'My forest',
      dataUpload: '05.08.21',
      stage: 12,
      openDate: new Date(2021, 4, 19, 8, 0, 0).getTime(),
      closeDate: new Date(2021, 5, 19, 8, 0, 0).getTime(),
      area: 167.98,
      location: 'California, USA',
      validFinished: true,
      affirmed: false,
    },
    {
      status: 'pending',
      name: 'My forest',
      dataUpload: '05.08.21',
      stage: 12,
      openDate: new Date(2021, 5, 8, 8, 0, 0).getTime(),
      closeDate: new Date(2021, 6, 8, 8, 0, 0).getTime(),
      area: 167.98,
      location: 'California, USA',
      validFinished: false,
      affirmed: null,
    },
    {
      status: 'open',
      name: 'My forest',
      dataUpload: '05.08.21',
      stage: 12,
      openDate: new Date(2021, 3, 25, 8, 0, 0).getTime(),
      closeDate: new Date(2021, 4, 25, 8, 0, 0).getTime(),
      area: 167.98,
      location: 'California, USA',
      validFinished: true,
      affirmed: true,
    },
    {
      status: 'completed',
      name: 'My forest',
      dataUpload: '05.08.21',
      stage: 12,
      openDate: new Date(2021, 4, 11, 8, 0, 0).getTime(),
      closeDate: new Date(2021, 5, 11, 8, 0, 0).getTime(),
      area: 167.98,
      location: 'California, USA',
      validFinished: true,
      affirmed: null,
    },
    {
      status: 'pending',
      name: 'My forest',
      dataUpload: '05.08.21',
      stage: 12,
      openDate: new Date(2021, 4, 14, 8, 0, 0).getTime(),
      closeDate: new Date(2021, 5, 14, 8, 0, 0).getTime(),
      area: 167.98,
      location: 'California, USA',
      validFinished: true,
      affirmed: false,
    },
    {
      status: 'open',
      name: 'My forest',
      dataUpload: '05.08.21',
      stage: 12,
      openDate: new Date(2021, 5, 1, 8, 0, 0).getTime(),
      closeDate: new Date(2021, 6, 1, 8, 0, 0).getTime(),
      area: 167.98,
      location: 'California, USA',
      validFinished: false,
      affirmed: null,
    },
    {
      status: 'completed',
      name: 'My forest',
      dataUpload: '05.08.21',
      stage: 12,
      openDate: new Date(2021, 4, 7, 8, 0, 0).getTime(),
      closeDate: new Date(2021, 5, 7, 8, 0, 0).getTime(),
      area: 167.98,
      location: 'California, USA',
      validFinished: true,
      affirmed: true,
    },
  ];
  const challengeArr = [
    {
      status: 'resolved',
      name: 'My forest',
      dataUpload: '05.08.21',
      stage: 12,
      openDate: new Date(2021, 5, 1, 8, 0, 0).getTime(),
      closeDate: new Date(2021, 6, 1, 8, 0, 0).getTime(),
      area: 167.98,
      location: 'California, USA',
      validFinished: false,
      affirmed: null,
    },
    {
      status: 'open',
      name: 'My forest',
      dataUpload: '05.08.21',
      stage: 12,
      openDate: new Date(2021, 4, 14, 8, 0, 0).getTime(),
      closeDate: new Date(2021, 5, 14, 8, 0, 0).getTime(),
      area: 167.98,
      location: 'California, USA',
      validFinished: true,
      affirmed: false,
    },
    {
      status: 'resolved',
      name: 'My forest',
      dataUpload: '05.08.21',
      stage: 12,
      openDate: new Date(2021, 5, 1, 8, 0, 0).getTime(),
      closeDate: new Date(2021, 6, 1, 8, 0, 0).getTime(),
      area: 167.98,
      location: 'California, USA',
      validFinished: false,
      affirmed: null,
    },
    {
      status: 'open',
      name: 'My forest',
      dataUpload: '05.08.21',
      stage: 12,
      openDate: new Date(2021, 4, 14, 8, 0, 0).getTime(),
      closeDate: new Date(2021, 5, 14, 8, 0, 0).getTime(),
      area: 167.98,
      location: 'California, USA',
      validFinished: true,
      affirmed: true,
    },
    {
      status: 'open',
      name: 'My forest',
      dataUpload: '05.08.21',
      stage: 12,
      openDate: new Date(2021, 5, 1, 8, 0, 0).getTime(),
      closeDate: new Date(2021, 6, 1, 8, 0, 0).getTime(),
      area: 167.98,
      location: 'California, USA',
      validFinished: false,
      affirmed: null,
    },
    {
      status: 'resolved',
      name: 'My forest',
      dataUpload: '05.08.21',
      stage: 12,
      openDate: new Date(2021, 4, 14, 8, 0, 0).getTime(),
      closeDate: new Date(2021, 5, 14, 8, 0, 0).getTime(),
      area: 167.98,
      location: 'California, USA',
      validFinished: true,
      affirmed: false,
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

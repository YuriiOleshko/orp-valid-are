/* eslint-disable react/prop-types */
import React from 'react';
// import { Page } from '../../routes';
import ExistingProjectsHeader from './components/ExistingProjectsHeader';
import ExistingProjectsList from './components/ExistingProjectsList';

const ExistingProjects = ({ data }) => (
  // const page = useContext(Page);
  // const uploadArr = [
  //   {
  //     status: 'open',
  //     name: 'My forest',
  //     dataUpload: '05.08.21',
  //     stage: 12,
  //     openDate: new Date(2021, 5, 2, 8, 0, 0).getTime(),
  //     closeDate: new Date(2021, 6, 2, 8, 0, 0).getTime(),
  //     area: 167.98,
  //     location: 'California, USA',
  //     validFinished: true,
  //     affirmed: false,
  //     validationVote: false,
  //     challengeVote: true,
  //   },
  //   {
  //     status: 'open',
  //     name: 'My forest',
  //     dataUpload: '05.08.21',
  //     stage: 12,
  //     openDate: new Date(2021, 5, 15, 8, 0, 0).getTime(),
  //     closeDate: new Date(2021, 6, 15, 8, 0, 0).getTime(),
  //     area: 167.98,
  //     location: 'California, USA',
  //     validFinished: false,
  //     affirmed: false,
  //     validationVote: false,
  //     challengeVote: true,
  //   },
  //   {
  //     status: 'completed',
  //     name: 'My forest',
  //     dataUpload: '05.08.21',
  //     stage: 12,
  //     openDate: new Date(2021, 3, 25, 8, 0, 0).getTime(),
  //     closeDate: new Date(2021, 4, 25, 8, 0, 0).getTime(),
  //     area: 167.98,
  //     location: 'California, USA',
  //     validFinished: true,
  //     affirmed: true,
  //     validationVote: true,
  //     challengeVote: false,
  //   },
  //   {
  //     status: 'open',
  //     name: 'My forest',
  //     dataUpload: '05.08.21',
  //     stage: 12,
  //     openDate: new Date(2021, 4, 10, 14, 0, 0).getTime(),
  //     closeDate: new Date(2021, 5, 10, 14, 0, 0).getTime(),
  //     area: 167.98,
  //     location: 'California, USA',
  //     validFinished: true,
  //     affirmed: true,
  //     validationVote: false,
  //     challengeVote: true,
  //   },
  // ];
  // const challengeArr = [
  //   {
  //     status: 'open',
  //     name: 'My forest',
  //     dataUpload: '05.08.21',
  //     stage: 12,
  //     openDate: new Date(2021, 5, 1, 8, 0, 0).getTime(),
  //     closeDate: new Date(2021, 6, 1, 8, 0, 0).getTime(),
  //     area: 167.98,
  //     location: 'California, USA',
  //     validFinished: true,
  //     affirmed: false,
  //     validationVote: false,
  //     challengeVote: true,
  //   },
  //   {
  //     status: 'resolved',
  //     name: 'My forest',
  //     dataUpload: '05.08.21',
  //     stage: 12,
  //     openDate: new Date(2021, 3, 25, 8, 0, 0).getTime(),
  //     closeDate: new Date(2021, 4, 25, 8, 0, 0).getTime(),
  //     area: 167.98,
  //     location: 'California, USA',
  //     validFinished: true,
  //     affirmed: true,
  //     validationVote: false,
  //     challengeVote: true,
  //   },
  //   {
  //     status: 'open',
  //     name: 'My forest',
  //     dataUpload: '05.08.21',
  //     stage: 12,
  //     openDate: new Date(2021, 4, 10, 7, 0, 0).getTime(),
  //     closeDate: new Date(2021, 5, 10, 7, 0, 0).getTime(),
  //     area: 167.98,
  //     location: 'California, USA',
  //     validFinished: true,
  //     affirmed: true,
  //     validationVote: false,
  //     challengeVote: true,
  //   },
  // ];
  <>
    <ExistingProjectsHeader />
    <ExistingProjectsList data={data} />
  </>
);
export default ExistingProjects;

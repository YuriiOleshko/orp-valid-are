import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router';
import CustomBtn from '../../../../components/generic/CustomBtn';
import { timeLineBtn } from '../../TimeLineLang';

const openDate = new Date(2021, 5, 10, 8, 0, 0);
const closeDate = new Date(2021, 6, 10, 8, 0, 0);
const uploadArr = [
  {
    status: 'completed',
    name: 'My forest',
    dataUpload: '05.08.21',
    stage: 12,
    openDate,
    closeDate,
    area: 167.98,
    location: 'California, USA',
  },
  {
    status: 'pending',
    name: 'My forest',
    dataUpload: '05.08.21',
    stage: 12,
    openDate,
    closeDate,
    area: 167.98,
    location: 'California, USA',
  },
  {
    status: 'open',
    name: 'My forest',
    dataUpload: '05.08.21',
    stage: 12,
    openDate,
    closeDate,
    area: 167.98,
    location: 'California, USA',
  },
  {
    status: 'completed',
    name: 'My forest',
    dataUpload: '05.08.21',
    stage: 12,
    openDate,
    closeDate,
    area: 167.98,
    location: 'California, USA',
  },
  {
    status: 'pending',
    name: 'My forest',
    dataUpload: '05.08.21',
    stage: 12,
    openDate,
    closeDate,
    area: 167.98,
    location: 'California, USA',
  },
  {
    status: 'open',
    name: 'My forest',
    dataUpload: '05.08.21',
    stage: 12,
    openDate,
    closeDate,
    area: 167.98,
    location: 'California, USA',
  },
  {
    status: 'completed',
    name: 'My forest',
    dataUpload: '05.08.21',
    stage: 12,
    openDate,
    closeDate,
    area: 167.98,
    location: 'California, USA',
  },
];
const ElementTree = ({ tree, index, currentlyTrees }) => {
  const intl = useIntl();
  const history = useHistory();
  const classCurrent =
    index === currentlyTrees ? 'timeline__card active' : 'timeline__card';
  return (
    <div className={classCurrent}>
      <div className="timeline__wrapper-card">
        <div className="timeline__trees-btn">
          <CustomBtn
            label={intl.formatMessage(timeLineBtn)}
            handleClick={() => {
              history.push({
                pathname: `/project/validation/hre`,
                state: { data: uploadArr[0] },
              });
            }}
            customClass=""
          />
        </div>
        <div className="timeline__trees">
          <img src={tree.img} alt="tree" />
        </div>
      </div>
    </div>
  );
};
ElementTree.propTypes = {
  tree: PropTypes.object,
  index: PropTypes.number,
  currentlyTrees: PropTypes.number,
};

export default ElementTree;

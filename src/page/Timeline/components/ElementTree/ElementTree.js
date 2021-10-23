import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router';
import CustomBtn from '../../../../components/generic/CustomBtn';
import { timeLineBtn } from '../../TimeLineLang';

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
                pathname: `/project/validation/${tree.project_id}`,
                state: { data: { id: tree.project_id, item: tree } },
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

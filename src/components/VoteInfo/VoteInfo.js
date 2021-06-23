import React from 'react';
import PropTypes from 'prop-types';

const VoteInfo = ({
  treeHeight,
  validationFinished,
  title,
  finishedTitle,
  greyTree,
  colorTree,
  fullTree,
  growTree,
  afterTree,
  affirmed,
}) => (
  <div className="project__vote">
    <h2 className="project__vote-title">
      {validationFinished ? finishedTitle : title}
    </h2>
    <div className="project__vote-tree">
      {greyTree && (
        <div
          className="project__vote-grey"
          style={{ height: `${treeHeight}%` }}
        >
          <img src={greyTree} alt="Tree" />
        </div>
      )}
      <div className="project__vote-color">
        {colorTree && fullTree && (
          <img src={validationFinished ? fullTree : colorTree} alt="Tree" />
        )}
        {growTree && afterTree && (
          <img src={affirmed ? growTree : afterTree} alt="Tree" />
        )}
      </div>
    </div>
    {/* <div className="project__vote-subtitle">
        <span className="project__vote-affirmed">
          Data Upload Affirmed - 2,299 ORP
        </span>
        <span className="project__vote-denied">
          Data Upload Denied - 80 ORP
        </span>
      </div>
      <CustomChart /> */}
  </div>
);

VoteInfo.propTypes = {
  treeHeight: PropTypes.number,
  validationFinished: PropTypes.bool,
  title: PropTypes.string,
  finishedTitle: PropTypes.string,
  greyTree: PropTypes.string,
  colorTree: PropTypes.string,
  fullTree: PropTypes.string,
  affirmed: PropTypes.bool,
  growTree: PropTypes.string,
  afterTree: PropTypes.string,
};

export default VoteInfo;

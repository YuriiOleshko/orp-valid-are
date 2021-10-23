/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

const SampleTree = ({
  treeName,
  status,
  height,
  diameter,
  treePhoto,
  labelPhoto,
}) => {
  const nameSlice = (fileName) =>
    `${fileName.slice(0, 20)}...${fileName.slice(
      fileName.length - 5,
      fileName.length,
    )}`;
  return (
    <>
      <div className="tree-item preview-report_item">
        <div className="tree">
          <span className="preview-report_name">{treeName}</span>
        </div>
        <div className="tree">
          <span className="preview-report_status">{status}</span>
        </div>
        <div className="tree">
          <span className="preview-report_size">{height}</span>
        </div>
        <div className="tree">
          <span className="preview-report_size">{diameter}</span>
        </div>
        <div className="tree">
          <span className="preview-report_photo">{nameSlice(treePhoto)}</span>
        </div>
        <div className="tree">
          <span className="preview-report_photo">{nameSlice(labelPhoto)}</span>
        </div>
      </div>
    </>
  );
};
export default SampleTree;

/* eslint-disable react/prop-types */
import React from 'react';
import CustomBtn from '../generic/CustomBtn';

function StageReport({ setViewStageReport }) {
  return (
    <>
      <CustomBtn
        label="View Stage Report"
        customClass="stage__report"
        handleClick={() => {
          document.body.classList.add('no-scroll');
          setViewStageReport(true);
        }}
      />
    </>
  );
}

export default StageReport;

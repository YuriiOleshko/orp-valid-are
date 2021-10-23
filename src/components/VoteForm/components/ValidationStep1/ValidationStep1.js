/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import CustomInput from '../../../generic/CustomInput';
import CustomBtn from '../../../generic/CustomBtn';

const ValidationStep1 = ({ data }) => {
  const {
    isActiveAlert,
    numOfOPP,
    setNumOfOPP,
    affirmDataUpload,
    stakingFinished,
    denyDataUpload,
  } = data;
  return (
    <div className="project__validate-wrapper">
      <h2 className="project__validate-title">Validate Data Upload</h2>
      <CustomInput
        labelText="Amount"
        classInput="project__validate-input"
        classLabel="project__validate-label"
        backgroundText="OPN"
        backgroundTextClass="project__validate-back"
        change={setNumOfOPP}
        value={numOfOPP}
        warningMessage={isActiveAlert && 'Enter amount of OPN!'}
      />
      <div className="project__validate-buttons">
        <CustomBtn
          label="Affirm"
          handleClick={affirmDataUpload}
          customClass="btn__affirm"
        />
        <CustomBtn
          label="Deny"
          handleClick={denyDataUpload}
          customClass="btn__deny"
        />
      </div>
    </div>
  );
};

ValidationStep1.propTypes = {
  data: PropTypes.object,
};

export default ValidationStep1;

import React from 'react';
import PropTypes from 'prop-types';
import CustomInput from '../../../generic/CustomInput';
import CustomBtn from '../../../generic/CustomBtn';

const ValidationStep1 = ({ data }) => {
  const {
    numOfORP,
    setNumOfORP,
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
        backgroundText="ORP"
        backgroundTextClass="project__validate-back"
        change={setNumOfORP}
        value={numOfORP}
      />
      <div className="project__validate-buttons">
        <CustomBtn
          label="Affirm"
          handleClick={affirmDataUpload}
          customClass="btn__affirm"
          disabled={stakingFinished}
        />
        <CustomBtn
          label="Deny"
          handleClick={denyDataUpload}
          customClass="btn__deny"
          disabled={stakingFinished}
        />
      </div>
    </div>
  );
};

ValidationStep1.propTypes = {
  data: PropTypes.object,
};

export default ValidationStep1;

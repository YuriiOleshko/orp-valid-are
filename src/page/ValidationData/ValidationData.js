import React from 'react';
import { useIntl } from 'react-intl';

import CustomBtn from '../../components/CustomBtn';
import ExistingProjects from '../../components/ExistingProjects';
import Filter from '../../components/Filter';
import { btnLoad } from './LangValidationData';

const ValidationData = () => {
  const intl = useIntl();
  return (
    <div className="validation">
      <div className="validation__filter">
        <Filter />
      </div>
      <div className="validation__data">
        <ExistingProjects />
      </div>
      <div className="validation__btn">
        <CustomBtn
          label={intl.formatMessage(btnLoad)}
          handleClick={() => {}}
          customClass="btn__load"
        />
      </div>
    </div>
  );
};

export default ValidationData;

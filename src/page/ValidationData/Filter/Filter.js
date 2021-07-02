import React, { useContext, useState } from 'react';
import { useIntl } from 'react-intl';

import CustomDatePicker from '../../../components/generic/CustomDatePicker';
import CustomInput from '../../../components/generic/CustomInput';
import CustomSelect from '../../../components/generic/CustomSelect';
import { Page } from '../../../routes';

import {
  projectPlaceholder,
  projectLabel,
  locationPlaceholder,
  locationLabel,
  stagePlaceholder,
  stageLabel,
  validPlaceholder,
  validLabel,
  challengePlaceholder,
  challengeLabel,
  validDateLabel,
  challengeDateLabel,
} from './LangFilter';

const stages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const uploadStatus = ['Pending', 'Open', 'Completed'];
const challengeStatus = ['Resolved', 'Open'];

const Filter = () => {
  const page = useContext(Page);
  const intl = useIntl();
  const [projectValue, setProjectValue] = useState('');
  const [locationValue, setLocationValue] = useState('');
  return (
    <>
      <CustomInput
        placeholder={intl.formatMessage(projectPlaceholder)}
        labelText={intl.formatMessage(projectLabel)}
        labelIcon="icon-filter-validator"
        classInputWrapper="filter-project"
        change={setProjectValue}
        value={projectValue}
      />
      <CustomInput
        placeholder={intl.formatMessage(locationPlaceholder)}
        labelText={intl.formatMessage(locationLabel)}
        classInputWrapper="filter-location"
        change={setLocationValue}
        value={locationValue}
      />
      <CustomSelect
        placeholder={intl.formatMessage(stagePlaceholder)}
        labelText={intl.formatMessage(stageLabel)}
        options={stages}
      />
      {page === 'data-uploads' ? (
        <CustomSelect
          placeholder={intl.formatMessage(validPlaceholder)}
          labelText={intl.formatMessage(validLabel)}
          options={uploadStatus}
        />
      ) : (
        <CustomSelect
          placeholder={intl.formatMessage(challengePlaceholder)}
          labelText={intl.formatMessage(challengeLabel)}
          options={challengeStatus}
        />
      )}
      <CustomDatePicker labelText={intl.formatMessage(validDateLabel)} />
      {page === 'challenges' && (
        <CustomDatePicker labelText={intl.formatMessage(challengeDateLabel)} />
      )}
    </>
  );
};

export default Filter;

import React, { useContext } from 'react';
import { useIntl } from 'react-intl';

import CustomDatePicker from '../CustomDatePicker';
import CustomInput from '../CustomInput/CustomInput';
import CustomSelect from '../CustomSelect/CustomSelect';
import { Page } from '../../routes';

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
  return (
    <>
      <CustomInput
        placeholder={intl.formatMessage(projectPlaceholder)}
        labelText={intl.formatMessage(projectLabel)}
        labelIcon="icon-filter-validator"
        classInputWrapper="filter-project"
      />
      <CustomInput
        placeholder={intl.formatMessage(locationPlaceholder)}
        labelText={intl.formatMessage(locationLabel)}
        classInputWrapper="filter-location"
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

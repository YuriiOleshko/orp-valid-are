/* eslint-disable react/prop-types */
/* eslint-disable no-plusplus */
import React, { useContext, useState, useEffect } from 'react';
import { useIntl } from 'react-intl';

import CustomDatePicker from '../../../components/generic/CustomDatePicker';
import CustomInput from '../../../components/generic/CustomInput';
import CustomSelect from '../../../components/generic/CustomSelect';
import Page from '../../../utils/context';

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

const Filter = ({ setFilterParams }) => {
  const page = useContext(Page);
  const intl = useIntl();
  const [projectValue, setProjectValue] = useState('');
  const [locationValue, setLocationValue] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    const paramsObj = {
      name: projectValue,
      region: locationValue,
      startTimeProject: [
        new Date(startDate).getTime(),
        new Date(endDate).getTime(),
      ],
      // finishTimeProject: endDate,
    };
    const paramsArr = Object.keys(paramsObj);
    const queryObj = {
      bool: {
        must: [],
      },
    };

    paramsArr.forEach((key) => {
      if (paramsObj[key]) {
        if (key === 'startTimeProject' && startDate && endDate) {
          queryObj.bool.must.push({
            range: {
              [key]: {
                gte: paramsObj[key][0],
                lte: paramsObj[key][1],
              },
            },
          });
        } else if (key !== 'startTimeProject') {
          queryObj.bool.must.push({
            wildcard: { [key]: `${paramsObj[key]}*` },
          });
        }
      }
    });

    if (queryObj.bool.must.length) {
      setFilterParams((prev) => ({
        ...prev,
        query: {
          ...queryObj,
        },
      }));
    } else {
      setFilterParams((prev) => ({
        ...prev,
        query: {
          match_all: {},
        },
      }));
    }
  }, [projectValue, locationValue, startDate, endDate]);

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
      <CustomDatePicker
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        labelText={intl.formatMessage(validDateLabel)}
      />
      {page === 'challenges' && (
        <CustomDatePicker
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          labelText={intl.formatMessage(challengeDateLabel)}
        />
      )}
    </>
  );
};

export default Filter;

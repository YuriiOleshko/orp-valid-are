import React, { useEffect } from 'react';
import { useRanger } from 'react-ranger';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import pointRange from '../../../assets/image/trees/rangePoint.png';
import {
  timeLineName,
  timeLineDp,
  timeLineUs,
  timeLineUf,
  timeLineValid,
} from '../TimeLineLang';
const Range = (props) => {
  const { values, setValues, calcCurrentTree, items, currentlyTrees } = props;
  const intl = useIntl();

  const moveRange = (newValue) => {
    const element = document.querySelector('.timeline__card');
    const elemWidth = element.clientWidth;
    const genContainer = document.querySelector('.timeline__container');
    calcCurrentTree(
      newValue,
      genContainer.clientWidth,
      genContainer.scrollLeft,
      elemWidth,
    );
    setValues(newValue);
  };
  const { getTrackProps, handles } = useRanger({
    min: 0,
    max: 100,
    stepSize: 1,
    values,
    onDrag: moveRange,
  });

  useEffect(() => {
    moveRange(values);
  }, []);
  const classNameBtn = values[0] > 70 ? 'range__btn right' : 'range__btn';
  return (
    <div className="range">
      <div
        {...getTrackProps({
          style: {
            height: '2px',
            background: '#2EC3E9',
            borderRadius: '30px',
          },
        })}
      >
        {handles.map(({ getHandleProps }) => (
          <div
            className={classNameBtn}
            {...getHandleProps({
              style: {
                width: '24px',
                height: '34px',
                outline: 'none',
                backgroundImage: `url(${pointRange})`,
                backgroundColor: 'transparent',
                border: 'none',
              },
            })}
          >
            <div className="range__time">{items[currentlyTrees].du}</div>
            <div className="range__tooltip">
              <div className="range__tooltip-field">
                <span>{intl.formatMessage(timeLineName)}:</span>
                {items[currentlyTrees].project}
              </div>
              <div className="range__tooltip-field">
                <span>{intl.formatMessage(timeLineDp)}:</span>
                {items[currentlyTrees].du}
              </div>
              <div className="range__tooltip-field">
                <span>{intl.formatMessage(timeLineUs)}:</span>
                {items[currentlyTrees].us}
              </div>
              <div className="range__tooltip-field">
                <span>{intl.formatMessage(timeLineUf)}:</span>
                {items[currentlyTrees].uf}
              </div>

              <div className="range__tooltip-field">
                <span>{intl.formatMessage(timeLineValid)}:</span>
                {items[currentlyTrees].valid}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
Range.propTypes = {
  values: PropTypes.array,
  setValues: PropTypes.func,
  calcCurrentTree: PropTypes.func,
  items: PropTypes.array,
  currentlyTrees: PropTypes.number,
};
export default Range;

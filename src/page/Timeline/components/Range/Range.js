import React, { useEffect, useState } from 'react';
import { useRanger } from 'react-ranger';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import pointRange from '../../../../assets/image/trees/rangePoint.png';
import {
  timeLineName,
  timeLineDp,
  timeLineUs,
  timeLineUf,
  timeLineValid,
} from '../../TimeLineLang';
import { formattedDate } from '../../../../utils/convert-utils';
const Range = (props) => {
  const { calcCurrentTree, items, currentlyTrees } = props;
  const intl = useIntl();
  const [val, setVal] = useState([50]);

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
    setVal(newValue);
  };
  const { getTrackProps, handles } = useRanger({
    min: 0,
    max: 99,
    stepSize: 1,
    values: val,
    onDrag: moveRange,
  });

  useEffect(() => {
    moveRange(val);
  }, []);
  const classNameBtn = val[0] > 70 ? 'range__btn right' : 'range__btn';
  return (
    items[currentlyTrees] && (
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
              <div className="range__time">
                {formattedDate(items[currentlyTrees].startTimeProject, '.')}
              </div>
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
    )
  );
};
Range.propTypes = {
  calcCurrentTree: PropTypes.func,
  items: PropTypes.array,
  currentlyTrees: PropTypes.number,
};
export default Range;

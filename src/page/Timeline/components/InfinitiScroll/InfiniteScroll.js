import React, { useEffect, useState, useRef } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import PropTypes from 'prop-types';
import ElementTree from '../ElementTree';
const InfiniteScroll = ({
  rangeValue,
  calcCurrentTree,
  currentlyTrees,
  items,
  resFunc,
}) => {
  const scrollContainerRef = useRef(null);
  const [disableScroll, setDisableScroll] = useState(false);
  const genScrollContainerRef = useRef(null);

  const handleScroll = (e, callback) => {
    if (!disableScroll) {
      const genContainer = genScrollContainerRef.current.container.current;
      const container = scrollContainerRef.current;
      // const amountElements = items.length;
      const element = document.querySelector('.timeline__card');
      const elemWidth = element.clientWidth;
      const widthGenContainer = genContainer.clientWidth;
      // const passElemenstsWidth = Math.floor(
      //   genContainer.scrollLeft / elemWidth,
      // );
      calcCurrentTree(
        rangeValue,
        genContainer.clientWidth,
        genContainer.scrollLeft,
        elemWidth,
      );

      if (
        genContainer.scrollLeft + widthGenContainer >=
        container.clientWidth - 3 * elemWidth
      ) {
        callback();
      }
      setDisableScroll(true);
    }
  };

  useEffect(() => {
    if (disableScroll) {
      setTimeout(() => setDisableScroll(false), 40);
    }
  }, [disableScroll]);
  return (
    <ScrollContainer
      className="timeline__container"
      hideScrollbars={false}
      onScroll={(e) => handleScroll(e, resFunc)}
      ref={genScrollContainerRef}
    >
      {/* <ScrollContainer> */}
      <div ref={scrollContainerRef} className="timeline__scrolling-wrapper">
        {items.map((i, index) => (
          <ElementTree
            tree={i}
            index={index}
            currentlyTrees={currentlyTrees}
            key={`${Date.now() + index}`}
          />
        ))}
      </div>
    </ScrollContainer>
  );
};
InfiniteScroll.propTypes = {
  rangeValue: PropTypes.array,
  calcCurrentTree: PropTypes.func,
  currentlyTrees: PropTypes.number,
  items: PropTypes.array,
  resFunc: PropTypes.func,
};
export default InfiniteScroll;

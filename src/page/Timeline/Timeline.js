import React, { useState } from 'react';
import moment from 'moment';
import InfiniteScroll from './components/InfinitiScroll';
import Range from './components/Range';
import pic1 from '../../assets/image/trees/tree1.svg';
import pic2 from '../../assets/image/trees/tree2.svg';
import pic3 from '../../assets/image/trees/tree3.svg';
import pic4 from '../../assets/image/trees/tree4.svg';
import pic5 from '../../assets/image/trees/tree5.svg';
import pic6 from '../../assets/image/trees/tree6.svg';
import pic7 from '../../assets/image/trees/tree7.svg';
import pic8 from '../../assets/image/trees/tree8.svg';
import pic9 from '../../assets/image/trees/tree9.svg';
import pic10 from '../../assets/image/trees/tree10.svg';
const arrayTrees = [
  pic1,
  pic2,
  pic3,
  pic4,
  pic5,
  pic6,
  pic7,
  pic8,
  pic9,
  pic10,
];
const Timeline = () => {
  const [values, setValues] = useState([50]);
  const [currentlyTrees, setCurrentlyTrees] = useState(0);
  const [items, setItems] = useState(
    Array.from({ length: 20 }).map((el, index) => ({
      img: arrayTrees[Math.floor(Math.random() * 10)],
      project: 'My forest',
      du: moment(new Date()).add(index, 'd').format('DD.MM.YY'),
      us: 1 + index,
      uf: `${150 + index} $`,
      valid: `${moment(new Date()).format('DD.MM.YY')} - ${moment(new Date())
        .add(index, 'd')
        .format('DD.MM.YY')}`,
    })),
  );
  const calcCurrentTree = (rangeValue, genWidth, genScroll, elemWidth) => {
    const currentTree = Math.floor(
      (rangeValue * (genWidth / 100) + genScroll) / elemWidth,
    );
    if (!(currentlyTrees === currentTree)) setCurrentlyTrees(currentTree);
  };
  const fetchMoreData = () => {
    setTimeout(() => {
      setItems(
        items.concat(
          Array.from({ length: 20 }).map((el, index) => ({
            img: arrayTrees[Math.floor(Math.random() * 10)],
            project: 'My forest',
            du: moment(new Date()).add(index, 'd').format('DD.MM.YY'),
            us: 1 + index,
            uf: `${150 + index} $`,
            valid: `${moment(new Date()).format('DD.MM.YY')} - ${moment(
              new Date(),
            )
              .add(index, 'd')
              .format('DD.MM.YY')}`,
          })),
        ),
      );
    }, 10);
  };

  return (
    <div className="timeline">
      <InfiniteScroll
        rangeValue={values}
        currentlyTrees={currentlyTrees}
        calcCurrentTree={calcCurrentTree}
        items={items}
        resFunc={fetchMoreData}
      />
      <Range
        values={values}
        setValues={setValues}
        items={items}
        currentlyTrees={currentlyTrees}
        calcCurrentTree={calcCurrentTree}
      />
    </div>
  );
};

export default Timeline;

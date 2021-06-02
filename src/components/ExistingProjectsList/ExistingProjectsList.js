import React from 'react';
import PropTypes from 'prop-types';
import ProjectCard from '../ProjectCard';

const ExistingProjectsList = ({ data }) => (
  <div className="validation__data-list">
    {data.map((item, id) => (
      /* eslint-disable react/no-array-index-key */
      <ProjectCard data={item} key={Date.now() + id} />
    ))}
  </div>
);

ExistingProjectsList.propTypes = {
  data: PropTypes.array,
};

export default ExistingProjectsList;

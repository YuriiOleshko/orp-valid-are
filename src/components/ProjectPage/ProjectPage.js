/* eslint-disable react/no-array-index-key */
import React from 'react';
import { useLocation } from 'react-router';
import { Bar, BarChart, LabelList, ResponsiveContainer, XAxis } from 'recharts';
import PropTypes from 'prop-types';
import CustomBtn from '../CustomBtn';
import CustomInput from '../CustomInput/CustomInput';

const ProjectPage = () => {
  const location = useLocation();
  const { data } = location.state;
  const { name, validOpen } = data;
  const [open, close] = validOpen.split(' / ');

  const colors = ['#49C179', '#FF586C'];

  const dataChart = [
    {
      name: 'Affirmed',
      uv: 2229,
    },
    {
      name: 'Denied',
      uv: 1000,
    },
  ];

  const CustomizedAxisTick = (props) => {
    const { x, y, payload, index } = props;
    return (
      <text
        className="chart-axis"
        x={x}
        y={y + 9}
        textAnchor="middle"
        fill={colors[index % 20]}
      >
        {payload.value}
      </text>
    );
  };

  CustomizedAxisTick.propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    index: PropTypes.number,
    payload: PropTypes.object,
  };

  const RectBar = (props) => {
    const { index, x, y, width, height } = props;

    return (
      <rect
        x={x}
        y={y}
        rx="8"
        ry="8"
        width={width}
        height={height}
        stroke="none"
        fill={colors[index % 20]}
      />
    );
  };

  RectBar.propTypes = {
    index: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
  };

  return (
    <div className="project">
      <div className="project__header">
        <h2 className="project__header-subtitle">Project name</h2>
        <h1 className="project__header-title">{name}</h1>
      </div>
      <div className="project__body">
        <div className="project__ongoing">
          <h2 className="project__ongoing-title">Ongoing Validation Window</h2>
          <div className="project__ongoing-countdown">
            <div className="countdown">
              <span className="countdown-title">Time left</span>
              <div className="countdown-value">7d 15h 5m</div>
            </div>
          </div>
          <div className="project__ongoing-time">
            <span>Open {open}</span>
            <span>Close {close}</span>
          </div>
        </div>
        <div className="project__validation-info">
          <div className="project__vote">
            <h2 className="project__vote-title">Votes Submitted</h2>
            <div className="project__vote-subtitle">
              <span className="project__vote-affirmed">
                Data Upload Affirmed - 2,299 ORP
              </span>
              <span className="project__vote-denied">
                Data Upload Denied - 80 ORP
              </span>
            </div>
            <div className="project__vote-charts">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={dataChart}
                  margin={{
                    top: 0,
                    right: 0,
                    left: 0,
                    bottom: 0,
                  }}
                  barSize={100}
                >
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={<CustomizedAxisTick />}
                  />
                  <Bar
                    dataKey="uv"
                    fill="#8884d8"
                    shape={<RectBar />}
                    isAnimationActive={false}
                  >
                    <LabelList
                      position="insideTop"
                      formatter={(value) => `${value} ORP`}
                      style={{
                        fontSize: 21,
                        fontWeight: 'bold',
                        fill: '#FFFFFF',
                      }}
                      width={50}
                      offset={10}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="project__validate">
            <h2 className="project__validate-title">Validate Data Upload</h2>
            <CustomInput
              labelText="Amount"
              classInput="project__validate-input"
              classLabel="project__validate-label"
              backgroundText="ORP"
              backgroundTextClass="project__validate-back"
            />
            <div className="project__validate-buttons">
              <CustomBtn
                label="Affirm"
                handleClick={() => {}}
                customClass="btn__affirm"
              />
              <CustomBtn
                label="Deny"
                handleClick={() => {}}
                customClass="btn__deny"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;

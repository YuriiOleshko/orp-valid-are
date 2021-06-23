import React from 'react';
import PropTypes from 'prop-types';
import { Bar, BarChart, LabelList, ResponsiveContainer, XAxis } from 'recharts';

const CustomChart = () => {
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
  );
};

export default CustomChart;

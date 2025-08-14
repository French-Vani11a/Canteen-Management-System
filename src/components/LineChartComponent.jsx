import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const LineChartComponent = ({ data}) => {
  const chartStyle = {
    width: '400px',
    height: '200px'
  };

  const {width, height} = chartStyle

  return (
    <div style={chartStyle}>
      <Line data={data} width={width} height={height} />
    </div>
  );
};

export default LineChartComponent;

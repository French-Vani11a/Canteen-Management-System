import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartComponent = ({ data, options = {} }) => {
  const chartStyle = {
    width: '400px',
    height:'400px',
    maxWidth: '100%'
  };

  return (
    <div className='pie_chart' style={chartStyle}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChartComponent;

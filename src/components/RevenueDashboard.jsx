import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { currencyFormatter } from '../utils/utility_functions';
import LineChartComponent from './LineChartComponent';
import PieChartComponent from './PieChartComponent';

// Register necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

const RevenueDashboard = () => {
  const [revenueData, setRevenueData] = useState({});
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (startDate && endDate) {
      fetchRevenueData();
    }
  }, [startDate, endDate]);

  const fetchRevenueData = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost/e_eat/fetch_revenue.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        if (response.error) {
          setError(response.error);
        } else {
          setRevenueData(response);
          setError(null);
        }
      } else {
        setError('Failed to fetch revenue data');
      }
    };
    xhr.send(`start_date=${encodeURIComponent(startDate)}&end_date=${encodeURIComponent(endDate)}`);
  };

  const calculateTotalRevenue = () => {
    if (Object.keys(revenueData).length === 0) return 0;

    const allRevenues = Object.values(revenueData).flatMap(itemData => itemData.revenues);
    return allRevenues.reduce((total, revenue) => total + parseFloat(revenue) / 100, 0);
  };
  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r}, ${g}, ${b},0.6)`;
  };

  const getPieChartData = () => {
    const itemNames = Object.keys(revenueData);
    const data = itemNames.map(itemName => {
      const totalRevenue = revenueData[itemName].revenues.reduce((total, revenue) => total + parseFloat(revenue), 0);
      return totalRevenue / 100;
    });

    return {
      labels: itemNames,
      datasets: [{
        data,
        backgroundColor: itemNames.map(() => getRandomColor()),
        borderColor: itemNames.map(() => getRandomColor().replace('0.6','1')),
        borderWidth: 1,
      }],
    };
  };

  const renderLineCharts = () => {
    return Object.entries(revenueData).map(([itemName, data]) => (
      <div key={itemName} className='line_chart'>
        <h3>{itemName}</h3>
        <LineChartComponent data={{
          labels: data.dates,
          datasets: [{
            label: itemName,
            data: data.revenues.map(rev => parseFloat(rev) / 100),
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
          }],
        }} />
      </div>
    ));
  };


  return (
    <div className='revenue_dashboard'>
      <h3>Select date range to view Sales Analytics</h3>
      <div className='date_range_inputs_container'>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          placeholder="Start Date"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          placeholder="End Date"
        />
      </div>
      <button
        onClick={(e) => {
          setStartDate('')
          setEndDate('')
          setRevenueData({})
        }}
        className='clear_revenue_info'
      >Clear</button>
      {error && <p>Error: {error}</p>}

      {Object.keys(revenueData).length > 0 && (
        <>
          <div className='pie_chart_container'>
          <h2>Total Revenue: ZIG{currencyFormatter(calculateTotalRevenue())}</h2>
            <PieChartComponent data={getPieChartData()} />
          </div>
          <div className='line_charts'>
            {renderLineCharts()}
          </div>
        </>
      )}
    </div>
  );
};

export default RevenueDashboard;

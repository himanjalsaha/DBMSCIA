import React from 'react';
import { Line } from 'react-chartjs-2';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May'],
  datasets: [
    {
      label: 'My Data',
      data: [65, 59, 80, 81, 56],
      fill: false, // To create an unfilled line
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 2,
    },
  ],
};

const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const Graph = () => {
  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export default Graph;

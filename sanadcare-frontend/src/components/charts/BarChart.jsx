import React from 'react';
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Card, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const BarChart = ({ data, title }) => {
  return (
    <Card className="p-4 shadow-md">
      <Typography variant="h6" className="mb-4 text-blue-600">
        {title}
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <ReBarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="consultations" fill="#2563EB" />
          <Bar dataKey="urgences" fill="#DC2626" />
        </ReBarChart>
      </ResponsiveContainer>
    </Card>
  );
};

// Tooltip personnalisé avec MUI
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 rounded shadow-md">
        <p className="text-sm font-bold">{payload[0].payload.name}</p>
        <p>
          Consultations :{' '}
          <span className="text-blue-600 font-medium">
            {payload[0].value}
          </span>
        </p>
        <p>
          Urgences :{' '}
          <span className="text-red-600 font-medium">
            {payload[1].value}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

// PropTypes pour validation
BarChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      consultations: PropTypes.number.isRequired,
      urgences: PropTypes.number.isRequired
    })
  ).isRequired,
  title: PropTypes.string.isRequired
};

// Données par défaut pour le développement
BarChart.defaultProps = {
  data: [
    { name: 'Jan', consultations: 400, urgences: 30 },
    { name: 'Fév', consultations: 300, urgences: 25 },
    { name: 'Mar', consultations: 200, urgences: 20 },
    { name: 'Avr', consultations: 278, urgences: 18 },
    { name: 'Mai', consultations: 189, urgences: 15 }
  ],
  title: 'Statistiques mensuelles'
};

export default BarChart;
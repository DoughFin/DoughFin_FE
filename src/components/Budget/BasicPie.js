import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

// Default data for fallback
const defaultData = [
  { id: 0, value: 25 },
  { id: 1, value: 75 },
];

export default function BasicPie({ data }) {
  // Validate incoming data - simple example
  const isValidData = data && Array.isArray(data) && data.length > 0 && data.every(d => d.hasOwnProperty('value') && typeof d.value === 'number');

  // Use incoming data if valid, otherwise use default
  const pieData = isValidData ? data : defaultData;

  return (
      <PieChart
          series={[
            {
              data: pieData,
              highlightScope: { faded: 'global', highlighted: 'item' },
              faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
              cx: 140,
              innerRadius: 60,
              outerRadius: 100,
              paddingAngle: 5,
              cornerRadius: 5,
            },
          ]}
          height={200}
      />
  );
}
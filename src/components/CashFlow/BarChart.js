import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';


export default function BasicBars({ cashFlow }) {
  const xAxisData = cashFlow ? cashFlow.map(item => item.month.slice(0, 3)) : [];
  const incomeData = cashFlow ? cashFlow.map(item => item.totalIncome) : [];
  const expenseData = cashFlow ? cashFlow.map(item => item.totalExpense) : [];

  let series = []

  if (cashFlow) {
    series = [
      { label: 'Total Income', data: incomeData, color: '#6359E9' },
      { label: 'Total Expense', data: expenseData, color: '#64CFF6' }
    ];
  }

  return (
    <BarChart
      xAxis={[{ scaleType: 'band', data: xAxisData, tickLabelStyle: { fill: '#8C89B4'}}]}
      yAxis={[{ scaleType: 'linear', tickLabelStyle: { fill: '#8C89B4' } }]}
      series={series.map(serie => ({ data: serie.data, color: serie.color }))}
      width={620}
      height={300}
      colors={['#6359E9', '#64CFF6']}
      margin={{
        left: 55,
        right: 1,
      }}
    />
  );
};
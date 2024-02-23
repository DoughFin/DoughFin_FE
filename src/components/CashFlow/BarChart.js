import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const sortMonths = (a, b) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return months.indexOf(a.month.slice(0, 3)) - months.indexOf(b.month.slice(0, 3));
};

export default function BasicBars({ cashFlow }) {
  const sortedCashFlow = cashFlow ? [...cashFlow].sort(sortMonths) : [];

  const xAxisData = sortedCashFlow ? sortedCashFlow.map(item => item.month.slice(0, 3)) : [];
  const incomeData = sortedCashFlow ? sortedCashFlow.map(item => parseFloat((item.totalIncome / 100).toFixed(2))) : [];
  const expenseData = sortedCashFlow ? sortedCashFlow.map(item => parseFloat((item.totalExpense / 100).toFixed(2))) : [];
  
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
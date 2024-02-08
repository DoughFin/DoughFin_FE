import React from 'react'
import './CashFlow.css'
import BarChart from './BarChart'
import BasicSelect from './BasicSelect'
import EllipsePurple from '../../assets/icons/Ellipse-purple.svg'
import EllipseBlue from '../../assets/icons/Ellipse-blue.svg'

const CashFlow = ({ cashFlow }) => {
  return (
    <main className='cashflow'>
      <header className='cashflow-header'>
        <h1 className='cashflow-h1'>Cash Flow</h1>
        <div className='cashflow-header-income'>
          <img src={EllipsePurple} alt='purple ellipse' />
          <p className='cashflow-header-text'>Income</p>
        </div>
        <div className='cashflow-header-income'>
          <img src={EllipseBlue} alt='purple ellipse' />
          <p className='cashflow-header-text'>Expenses</p>
        </div>
        <BasicSelect />
      </header>
      <BarChart 
        cashFlow={cashFlow}
      />
    </main>
  )
};

export default CashFlow
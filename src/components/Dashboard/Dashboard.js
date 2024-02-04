import React from 'react'
import './Dashboard.css'
import Total from '../Total/Total'
import TransactionsTable from '../TransactionsTable/TransactionsTable'
import DownArrow from '../../assets/icons/down-arrow.svg'
import UpArrow from '../../assets/icons/up-arrow.svg'

const Dashboard = () => {
  return (
    <main className='dashboard'>
      <section className='dashboard-section'>
        <table className='dashboard-activity-chart'>
          A Chart.js chart will go here
        </table>
        <div className='dashboard-totals-container'>
          {/* The Total component will need conditional rendering to for the arrow AND percentage */}
          <Total
            totalType={'Total Income:'}
            totalAmount={'6132.00'}
            totalPercentage={'+1.29%'}
            arrow={UpArrow}
          />
          <Total
            totalType={'Total Expenses:'}
            totalAmount={'53711.00'}
            totalPercentage={'-1.29%'}
            arrow={DownArrow}
          />
        </div>
        <TransactionsTable 
        
        />
      </section>
      <aside className='dashboard-aside'>
        Aside
      </aside>
    </main>
  )
}

export default Dashboard
import React from "react";
import "./Dashboard.css";
import Total from "../Total/Total";
import TransactionsTable from "../TransactionsTable/TransactionsTable";
import Budget from "../Budget/Budget";
import CashFlow from "../CashFlow/CashFlow";

const Dashboard = ({
  cashFlow,
  totalIncome,
  setTotalIncome,
  totalExpenses,
  setTotalExpenses,
  incomeTransactions,
  setIncomeTransactions,
  expensesTransactions,
  setExpensesTransactions,
}) => {

  

  return (
    <main className="dashboard">
      <section className="dashboard-section">
        <CashFlow 
          cashFlow={cashFlow}
        />
        <div className="dashboard-totals-container">
          <Total
            totalType={"Total Income:"}
            setIncomeTransactions={setIncomeTransactions}
            totalAmount={totalIncome}
            setTotalIncome={setTotalIncome}
          />
          <Total
            totalType={"Total Expenses:"}
            setExpensesTransactions={setExpensesTransactions} 
            totalAmount={totalExpenses}
            setTotalExpenses={setTotalExpenses}
          />
        </div>
        <TransactionsTable
          incomeTransactions={incomeTransactions}
          expensesTransactions={expensesTransactions}
        />
      </section>
      <Budget />
    </main>
  );
};

export default Dashboard;

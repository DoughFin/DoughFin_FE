import React from "react";
import "./Dashboard.css";
import TransactionsTable from "../TransactionsTable/TransactionsTable";
import Budget from "../Budget/Budget";
import CashFlow from "../CashFlow/CashFlow";
import AddExpense from "../AddExpense/AddExpense";
import AddIncome from "../AddIncome/AddIncome";

const Dashboard = ({
  cashFlow,
  transactions,
  setTransactions,
  totalIncome,
  setTotalIncome,
  totalExpenses,
  setTotalExpenses,
}) => {

  

  return (
    <main className="dashboard">
      <section className="dashboard-section">
        <CashFlow 
          cashFlow={cashFlow}
        />
        <div className="dashboard-totals-container">
          <AddIncome
            totalIncome={totalIncome}
            setTotalIncome={setTotalIncome}
            setTransactions={setTransactions}
          />
          <AddExpense
            totalExpenses={totalExpenses}
            setTotalExpenses={setTotalExpenses}
            setTransactions={setTransactions}
          />
        </div>
        <TransactionsTable
          transactions={transactions}
        />
      </section>
      <Budget />
    </main>
  );
};

export default Dashboard;

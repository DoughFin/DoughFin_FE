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
  useCreateExpense,
  useCreateIncome
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
            addIncome={addIncome}
          />
          <Total
            totalType={"Total Expenses:"}
            setExpensesTransactions={setExpensesTransactions} 
            totalAmount={totalExpenses}
            setTotalExpenses={setTotalExpenses}
            addExpense={addExpense}
            useCreateExpense={useCreateExpense}
            useCreateIncome={useCreateIncome}
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

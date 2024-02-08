import React from "react";
import "./TransactionsTable.css";

const TransactionsTable = ({ incomeTransactions, expensesTransactions }) => {
  const incomeEntries = incomeTransactions && incomeTransactions.map((transaction) => {
    return (
      <tr className="transactions-tr" key={transaction.id}>
        <td>{transaction.vendor}</td>
        <td>{transaction.date}</td>
        <td>${transaction.amount}</td>
        <td style={{ color: '#02B15A' }} className="transactions-status-text">{transaction.status}</td>
      </tr>
    );
  });
  const expenseEntries = expensesTransactions && expensesTransactions.map((transaction) => {
    return (
      <tr className="transactions-tr" key={transaction.id}>
        <td>{transaction.vendor}</td>
        <td>{transaction.date}</td>
        <td>${transaction.amount}</td>
        <td style={{ color: '#E41414' }} className="transactions-status-text">{transaction.status}</td>
      </tr>
    );
  });
  return (
    <section className="transactions">
      <header className="transactions-header">
        <h1 className="transactions-h1">Transactions</h1>
        <div className="transactions-searchbar-container">
          <div className="searchbar-flex">
            <input
              className="searchbar-text"
              type="text"
              placeholder="Search..."
            />
            <button className="searchbar-button"></button>
          </div>
        </div>
      </header>
      <div className="table-scroll">
        <table className="transactions-table-container">
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>{incomeEntries}{expenseEntries}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default TransactionsTable;

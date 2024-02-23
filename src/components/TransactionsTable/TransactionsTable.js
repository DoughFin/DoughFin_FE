import React from "react";
import "./TransactionsTable.css";

const TransactionsTable = ({ transactions }) => {
  const titleize = (sentence) => {
    return sentence
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const sortedTransactions = transactions
  ? [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date))
  : [];

const uniqueTransactions = new Set();
sortedTransactions.forEach(transaction => {
  uniqueTransactions.add(transaction.id);
});

const transactionEntries = [...uniqueTransactions].map(transactionId => {
  const transaction = sortedTransactions.find(transaction => transaction.id === transactionId);
  if (!transaction) return null;
  
  let statusColor = transaction.status === 'credited' ? '#02B15A' : '#E41414';
  return (
    <tr className="transactions-tr" key={transaction.id}>
      <td>{titleize(transaction.vendor)}</td>
      <td>{transaction.date}</td>
      <td>{(transaction.amount / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
      <td style={{ color: statusColor }} className="transactions-status-text">{titleize(transaction.status)}</td>
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
          <tbody>
            {transactionEntries}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default TransactionsTable;

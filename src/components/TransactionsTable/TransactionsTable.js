import React, { useState } from "react";

import "./TransactionsTable.css";

const TransactionsTable = ({ transactions }) => {
  const [searchTerm, setSearchTerm] = useState("");
 // uses a state which can be updated to find matching values for the search term

  const titleize = (sentence) => {
    return sentence
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const searchedTransactions = transactions.filter((transaction) => {
    const transactionValues = Object.values(transaction).join("").toLowerCase();
    return transactionValues.includes(searchTerm.toLowerCase());
  });
 // checks if the search term, when lowercased, matches ANY of the values within the transactions table
  const sortedTransactions = searchedTransactions.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

const uniqueTransactions = [];
const transactionEntries = sortedTransactions.map((transaction) => {
  if (!uniqueTransactions.some((t) => t.id === transaction.id)) {
    uniqueTransactions.push(transaction);
    let statusColor = transaction.status === 'credited' ? '#02B15A' : '#E41414';
    return (
      <tr className="transactions-tr" key={transaction.id}>
        <td>{titleize(transaction.vendor)}</td>
        <td>{titleize(transaction.category || "Income")}</td>
        <td>{transaction.date}</td>
        <td>{(transaction.amount / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
        <td style={{ color: statusColor }} className="transactions-status-text">{titleize(transaction.status)}</td>
      </tr>
    );
  }
});

const handleSearch = (event) => {
  setSearchTerm(event.target.value);
};
 // holds the function to set the search term state when the event is called
  return (
    <section className="transactions">
      <header className="transactions-header">
        <h1 className="transactions-h1">Transactions</h1>
        <div className="transactions-searchbar-container">
          <div className="searchbar-flex">
            <input
              className="searchbar-text"
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
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
              <th>Category</th>
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

import React, { useState, useEffect } from 'react'
import NavBar from '../NavBar/NavBar'
import Dashboard from '../Dashboard/Dashboard'
import cashflowData from "../../CashFlowData.json"
// import transactionsData from "../sample-data/TransactionsData.json"
// import incomeData from "../sample-data/IncomeData.json"
// import expensesData from "../sample-data/ExpensesData.json"
import './App.css';
import { useGetIncomes } from '../apollo-client/queries/getIncomes';
import { useGetExpenses } from '../apollo-client/queries/getExpenses';
import { useGetTransactions } from '../apollo-client/queries/getTransactions';
import { useCreateExpense } from '../apollo-client/mutations/createExpense';
import { useCreateIncome } from '../apollo-client/mutations/createIncome';


const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [incomeTransactions, setIncomeTransactions] = useState([]);
  const [expensesTransactions, setExpensesTransactions] = useState([]);
  const [totalIncome, setTotalIncome] = useState(null);
  const [totalExpenses, setTotalExpenses] = useState(null);
  
  {/* Hardcoded user, will pull from getUser endpoint soon */}
  const userName = cashflowData.data.cashFlow.username;
  const email = "moneybaggins@bigbanktakelilbank.doge"

  const { loading: loadingIncomes, error: errorIncomes, totalIncomeData } = useGetIncomes(email);
  const { loading: loadingExpenses, error: errorExpenses, totalExpensesData } = useGetExpenses(email);
  const { loading: loadingTransactions, error: errorTransactions, transactionsData } = useGetTransactions(email);

  useEffect(() => {
    if (totalIncomeData) setTotalIncome(totalIncomeData);
    if (totalExpensesData) setTotalExpenses(totalExpensesData);
    if (transactionsData) setTransactions(transactionsData);
  }, [totalIncomeData, totalExpensesData, transactionsData]);

  useEffect(() => {
    const incomeTransactions = transactions.filter(t => t.type === 'income');
    const expenseTransactions = transactions.filter(t => t.type === 'expense');
    setIncomeTransactions(incomeTransactions);
    setExpensesTransactions(expenseTransactions);
  }, [transactions]);

  return (
    <main className='app'>
      <NavBar userName={userName} />
      <Dashboard
        transactions={transactions}
        totalIncome={totalIncome}
        setTotalIncome={setTotalIncome}
        totalExpenses={totalExpenses}
        setTotalExpenses={setTotalExpenses}
        incomeTransactions={incomeTransactions}
        setIncomeTransactions={setIncomeTransactions}
        expensesTransactions={expensesTransactions}
        setExpensesTransactions={setExpensesTransactions}
      />
    </main>
  )
}

export default App;
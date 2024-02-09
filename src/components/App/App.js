import React, { useState, useEffect } from 'react'
import NavBar from '../NavBar/NavBar'
import Dashboard from '../Dashboard/Dashboard'
import './App.css';
import { useGetIncomes } from '../apollo-client/queries/getIncomes';
import { useGetExpenses } from '../apollo-client/queries/getExpenses';
import { useGetTransactions } from '../apollo-client/queries/getTransactions';
import { useCreateExpense } from '../apollo-client/mutations/createExpense';
import { useCreateIncome } from '../apollo-client/mutations/createIncome';
import { useGetCashFlow } from '../apollo-client/queries/getCashFlow';


const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [incomeTransactions, setIncomeTransactions] = useState([]);
  const [expensesTransactions, setExpensesTransactions] = useState([]);
  const [totalIncome, setTotalIncome] = useState(null);
  const [totalExpenses, setTotalExpenses] = useState(null);
  const [cashFlow, setCashFlow] = useState(null);

  {/* Hardcoded user, will pull from getUser endpoint soon */}
  const userName = "john_smith";
  const email = "email@email.com"



  
  const { loading: loadingIncomes, error: errorIncomes, totalIncomeData } = useGetIncomes(email);
  const { loading: loadingExpenses, error: errorExpenses, totalExpensesData } = useGetExpenses(email);
  const { loading: loadingTransactions, error: errorTransactions, transactionsData } = useGetTransactions(email);
  const { loading: loadingCashFlow, error: errorCashFlow, cashFlowData } = useGetCashFlow(email);

  useEffect(() => {
    if (totalIncomeData) setTotalIncome(totalIncomeData);
    if (totalExpensesData) setTotalExpenses(totalExpensesData);
    if (transactionsData) setTransactions(transactionsData);
    if (cashFlowData) setCashFlow(cashFlowData);
  }, [totalIncomeData, totalExpensesData, transactionsData, cashFlowData]);

  useEffect(() => {
    const incomeTransactions = transactions.filter(t => t.status === 'credited');
    const expenseTransactions = transactions.filter(t => t.status === 'debited');
    setIncomeTransactions(incomeTransactions);
    setExpensesTransactions(expenseTransactions);
  }, [transactions]);



  return (
    <main className='app'>
      <NavBar userName={userName} />
      <Dashboard
        cashFlow={cashFlow}
        transactions={transactions}
        totalIncome={totalIncome}
        setTotalIncome={setTotalIncome}
        totalExpenses={totalExpenses}
        setTotalExpenses={setTotalExpenses}
        incomeTransactions={incomeTransactions}
        setIncomeTransactions={setIncomeTransactions}
        expensesTransactions={expensesTransactions}
        setExpensesTransactions={setExpensesTransactions}
        useCreateExpense={useCreateExpense}
        useCreateIncome={useCreateIncome}
      />
    </main>
  )
}

export default App;
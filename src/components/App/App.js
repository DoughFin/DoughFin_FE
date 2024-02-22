import React, { useState, useEffect } from 'react'
import NavBar from '../NavBar/NavBar'
import Dashboard from '../Dashboard/Dashboard'
// import cashflowData from "../sample-data/CashFlowData.json"
// import transactionsFixtureData from "../sample-data/TransactionsData.json"
// import incomeData from "../sample-data/IncomeData.json"
// import expensesData from "../sample-data/ExpensesData.json"
import './App.css';
import { useGetIncomes } from '../apollo-client/queries/getIncomes';
import { useGetExpenses } from '../apollo-client/queries/getExpenses';
import { useGetTransactions } from '../apollo-client/queries/getTransactions';
import { useGetCashFlow } from '../apollo-client/queries/getCashFlow';


const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [cashFlow, setCashFlow] = useState(null);

  // Hardcoded user, will pull from getUser endpoint soon
  const userName = "Powdered Toast Man";
  const email = "email@email.com"
  
  const { totalIncomeData } = useGetIncomes(email);
  const { totalExpensesData } = useGetExpenses(email);
  const { transactionsData } = useGetTransactions(email);
  const { cashFlowData } = useGetCashFlow(email);

  useEffect(() => {
    if (totalIncomeData) {
      const totalIncomeCents = Math.round(parseFloat(totalIncomeData) * 100);
      setTotalIncome(totalIncomeCents);
    }
    if (totalExpensesData) {
      const totalExpensesCents = Math.round(parseFloat(totalExpensesData) * 100);
      setTotalExpenses(totalExpensesCents);
    }
    if (totalExpensesData) setTotalExpenses(totalExpensesData);
    if (transactionsData) setTransactions(transactionsData);
    if (cashFlowData) setCashFlow(cashFlowData);
  }, [totalIncomeData, totalExpensesData, transactionsData, cashFlowData]);

  return (
    <main className='app'>
      <NavBar userName={userName} />
      <Dashboard
        cashFlow={cashFlow}
        transactions={transactions}
        setTransactions={setTransactions}
        totalIncome={totalIncome}
        setTotalIncome={setTotalIncome}
        totalExpenses={totalExpenses}
        setTotalExpenses={setTotalExpenses}
      />
    </main>
  )
}

export default App;

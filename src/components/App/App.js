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
import { useCreateExpense } from '../apollo-client/mutations/createExpense';
import { useCreateIncome } from '../apollo-client/mutations/createIncome';
import { useGetCashFlow } from '../apollo-client/queries/getCashFlow';
import { useGetBudgetsByParams } from '../apollo-client/queries/getBudgetByParams';


const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [incomeTransactions, setIncomeTransactions] = useState([]);
  const [expensesTransactions, setExpensesTransactions] = useState([]);
  const [totalIncome, setTotalIncome] = useState(null);
  const [totalExpenses, setTotalExpenses] = useState(null);
  const [cashFlow, setCashFlow] = useState(null);
  const [budget, setBudget] = useState(null);

  {/* Hardcoded user, will pull from getUser endpoint soon */}
  const userName = "Powdered Toast Man";
  const email = "moneybaggins@bigbanktakelilbank.doge"
  const userId = "3"
  
  const { loading: loadingIncomes, error: errorIncomes, totalIncomeData } = useGetIncomes(email);
  const { loading: loadingExpenses, error: errorExpenses, totalExpensesData } = useGetExpenses(email);
  const { loading: loadingTransactions, error: errorTransactions, transactionsData } = useGetTransactions(email);
  const { loading: loadingCashFlow, error: errorCashFlow, cashFlowData } = useGetCashFlow(email);
  const { loading: loadingBudget, error: errorBudget, budgetData } = useGetBudgetsByParams(userId, "2024-02", "Nonprofit");

  useEffect(() => {
    if (totalIncomeData) setTotalIncome(totalIncomeData);
    if (totalExpensesData) setTotalExpenses(totalExpensesData);
    if (transactionsData) setTransactions(transactionsData);
    if (cashFlowData) setCashFlow(cashFlowData);
    if (budgetData) setBudget(budgetData);
  }, [totalIncomeData, totalExpensesData, transactionsData, cashFlowData, budgetData]);

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
        setBudgets={setBudget}
      />
    </main>
  )
}

export default App;
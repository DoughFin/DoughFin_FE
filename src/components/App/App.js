import React, { useState, useEffect } from 'react'
import NavBar from '../NavBar/NavBar'
import Dashboard from '../Dashboard/Dashboard'
// import cashflowData from "../sample-data/CashFlowData.json"
// import transactionsFixtureData from "../sample-data/TransactionsData.json"
// import incomeData from "../sample-data/IncomeData.json"
// import expensesData from "../sample-data/ExpensesData.json"
// import budgetsData from "../sample-data/BudgetsData.json"
import './App.css';
import { useGetIncomes } from '../apollo-client/queries/getIncomes';
import { useGetExpenses } from '../apollo-client/queries/getExpenses';
import { useGetTransactions } from '../apollo-client/queries/getTransactions';
import { useGetCashFlow } from '../apollo-client/queries/getCashFlow';
import { useGetBudgetsByParams } from '../apollo-client/queries/getBudgetsByParams';

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [incomeTransactions, setIncomeTransactions] = useState([]);
  const [expensesTransactions, setExpensesTransactions] = useState([]);
  const [totalIncome, setTotalIncome] = useState(null);
  const [totalExpenses, setTotalExpenses] = useState(null);
  const [cashFlow, setCashFlow] = useState(null);
  const [budgets, setBudgets] = useState(null);

  // Hardcoded user, will pull from getUser endpoint soon
  const userName = "Powdered Toast Man";
  const email = "moneybaggins@bigbanktakelilbank.doge"
  const month = "2024-02"; 
  const category = "Groceries"; 
  
  const { totalIncomeData } = useGetIncomes(email);
  const { totalExpensesData } = useGetExpenses(email);
  const { transactionsData } = useGetTransactions(email);
  const { cashFlowData } = useGetCashFlow(email);
  const { budgetsData } = useGetBudgetsByParams(month, category, email);

  useEffect(() => {
    if (totalIncomeData) setTotalIncome(totalIncomeData);
    if (totalExpensesData) setTotalExpenses(totalExpensesData);
    if (transactionsData) setTransactions(transactionsData);
    if (cashFlowData) setCashFlow(cashFlowData);
    if (budgetsData) setBudgets(budgetsData);
    }, [totalIncomeData, totalExpensesData, transactionsData, cashFlowData, budgetsData]); 

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
        budgets={budgets}
      />
    </main>
  )
}

export default App;
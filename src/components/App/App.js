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
import { createContext } from "react";

export const ThemeContext = createContext("null");

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [cashFlow, setCashFlow] = useState(null);
  const [budgets, setBudgets] = useState(null);

  // Hardcoded user, will pull from getUser endpoint soon
  const month = "2024-02";
  // const category = "Travel";
  const userName = "Powdered Toast Man";
  const email = "moneybaggins@bigbanktakelilbank.doge"
  localStorage.setItem('email', email);

  const { totalIncomeData } = useGetIncomes(email);
  const { totalExpensesData } = useGetExpenses(email);
  const { transactionsData } = useGetTransactions(email);
  const { cashFlowData } = useGetCashFlow(email);
  // const { budgetsData } = useGetBudgetsByParams(month, category, email);

  useEffect(() => {
    if (totalIncomeData) {
      const totalIncomeCents = totalIncomeData;
      setTotalIncome(totalIncomeCents);
    }
    if (totalExpensesData) {
      const totalExpensesCents = totalExpensesData;
      setTotalExpenses(totalExpensesCents);
    }
    if (totalExpensesData) setTotalExpenses(totalExpensesData);
    if (transactionsData) setTransactions(transactionsData);
    if (cashFlowData) setCashFlow(cashFlowData);
    // if (budgetsData) setBudgets(budgetsData);
    }, [totalIncomeData, totalExpensesData, transactionsData, cashFlowData]);

  const [theme, setTheme] = useState("dark")
  const toggleTheme = () => {
    setTheme((curr) => (curr == "light" ? "dark" : "light"));
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <main className='app' id={theme}>
        <NavBar userName={userName} onToggle={toggleTheme} theme={theme} />
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
    </ThemeContext.Provider>
  )
}

export default App;

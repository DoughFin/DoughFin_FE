import { useQuery } from "@apollo/client";
import { GET_USER } from "../src/queries/getUser";
import { GET_EXPENSES } from "./queries/getExpenses";
import { GET_INCOMES } from "./queries/getIncomes";
import { GET_TRANSACTIONS } from "./queries/getTransactions";
import { GET_USER_CASH_FLOW } from "./queries/getUserCashFlow";
import { CREATE_EXPENSE } from "./components/apollo-client/mutations/createExpense";
import { GET_BUDGET_BY_PARAMS} from "./components/apollo-client/queries/getBudgetByParams";

function GetUser({ email }) {
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { email },
  });
  if (loading) return null;
  if (error) return `Error! ${error}`;

  const user = data.user;
  console.log(data.user);
  return (
    <div key={user.id}>
      <h3>{user.email}</h3>
      <p>{user.username}</p>
    </div>
  );
}

function GetExpenses({ email }) {
  const { loading, error, data } = useQuery(GET_EXPENSES, {
    variables: { email },
  });
  if (loading) return null;
  if (error) return `Error! ${error}`;

  const expenses = data.user.currentExpenses;
  console.log(expenses);
  return (
    <div>
      <h3>{expenses.amount}</h3>
      <p>{expenses.pctChange}</p>
    </div>
  );
}

function GetIncomes({ email }) {
  const { loading, error, data } = useQuery(GET_INCOMES, {
    variables: { email },
  });
  if (loading) return null;
  if (error) return `Error! ${error}`;

  const incomes = data.user.currentIncomes;
  console.log(incomes);
  return (
    <div>
      <h3>{incomes.amount}</h3>
      <p>{incomes.pctChange}</p>
    </div>
  );
}

function GetTransactions({ email }) {
  const { loading, error, data } = useQuery(GET_TRANSACTIONS, {
    variables: { email },
  });
  if (loading) return null;
  if (error) return `Error! ${error}`;

  const transactions = data.user.transactions;
  console.log(transactions);
  return (
    <div key={data.user.id}>
      <h3>{transactions.amount}</h3>
      <p>{transactions.date}</p>
      <p>{transactions.category}</p>
      <p>{transactions.type}</p>
    </div>
  );
}

function GetUserCashFlow({ userId }) {
  const { loading, error, data } = useQuery(GET_USER_CASH_FLOW, {
    variables: { userId },
  });
  if (loading) return null;
  if (error) return `Error! ${error}`;

  const cashFlow = data.cashFlow;
  console.log(cashFlow);
  return (
    <div>
      <h3>{cashFlow.username}</h3>
      <p>{cashFlow.years}</p>
    </div>
  );
}



export default {
  GetUser,
  GetExpenses,
  GetIncomes,
  GetTransactions,
  GetUserCashFlow,
};

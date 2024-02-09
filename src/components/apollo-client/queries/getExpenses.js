import { gql, useQuery } from "@apollo/client";

export const GET_EXPENSES = gql`
query GetExpenses($email: String!) {
  user(email: $email) {
      currentExpenses {
          amount
          pctChange
      }
  }
}`

export const useGetExpenses = (email) => {
  const { loading, error, data } = useQuery(GET_EXPENSES, {
    variables: { email: email },
  });
  let totalExpensesData = null;
  if (!loading && data) {
    totalExpensesData = data?.user?.currentExpenses?.amount;
  }
  return { loading, error, totalExpensesData };
};
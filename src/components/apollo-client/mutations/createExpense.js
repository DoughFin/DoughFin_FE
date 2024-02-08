import { gql, useQuery } from "@apollo/client";

export const CREATE_EXPENSE = gql`
mutation CreateExpense($userId: ID!, $vendor: String, $cat: String!, $amount: Float!, $status: String!, $date: String!) {
  createExpense(
      userId: $userId,
      vendor: $vendor,
      category: $cat,
      amount: $amount,
      status: $status,
      date: $date
  ) {
      userId
      vendor
      category
      amount
      status
      date
  }
}`

export const useCreateExpense = (userId, vendor, category, amount, status, date) => {
  const { loading, error, data } = useQuery(CREATE_EXPENSE, {
    variables: { userId: userId, vendor: vendor, category: category, amount: amount, status: status, date: date },
  });
  let newExpenseData = null;
  if (!loading && data) {
    newExpenseData = data?.user?.currentExpenses?.amount?.toFixed(2);
  }
  return { loading, error, newExpenseData };
};
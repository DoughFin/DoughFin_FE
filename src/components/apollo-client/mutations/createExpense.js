import { gql, useMutation } from "@apollo/client";

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

export const useCreateExpense = () => {
  const [mutate, { data, loading, error }] = useMutation(CREATE_EXPENSE);
    const executeMutation = (userId, vendor, category, amount, status, date ) => mutate({userId, vendor, category, amount, status, date});
  return [executeMutation, { data, loading, error }];
};
import { gql, useMutation } from "@apollo/client";

export const CREATE_EXPENSE = gql`
mutation CreateExpense($userId: ID!, $vendor: String!, $category: String!, $amount: Float!, $date: String!) {
  createExpense(input: {
      userId: $userId,
      vendor: $vendor,
      category: $category,
      amount: $amount,
      date: $date
  }) {
      userId
      vendor
      category
      amount
      date
  }
}`

export const useCreateExpense = () => {
  const [createExpenseMutation, { loading, error, data }] = useMutation(CREATE_EXPENSE);
  return {
    createExpense: createExpenseMutation,
    loading,
    error,
    data,
  };
};
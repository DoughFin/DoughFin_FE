import { gql, useMutation } from "@apollo/client";

export const CREATE_BUDGET = gql`
mutation CreateBudget($userId: ID!, $month: String!, $category: String!, $amount: Float!) {
    createBudget(input:
        {userId: $userId,
        month: $month,
        category: $category,
        amount: $amount}
    ) {
        userId
        month
        category
        amount
    }
}`

export const useCreateBudget = () => {
  const [createExpenseMutation, { loading, error, data }] = useMutation(CREATE_BUDGET);
  return {
    createExpense: createExpenseMutation,
    loading,
    error,
    data,
  };
};
import { gql, useMutation } from "@apollo/client";

export const CREATE_INCOME = gql`
mutation CreateIncome($userId: ID!, $source: String!, $amount: Float!, $date: String!) {
    createIncome(input: {
        userId: $userId,
        source: $source,
        amount: $amount,
        date: $date
    }) {
        userId
        income {
            source
            amount
            date
        }
    }
}`;

export const useCreateIncome = () => {
  const [createIncome, { loading, error, data }] = useMutation(CREATE_INCOME);
  return {
    createIncome: createIncome,
    loading,
    error,
    data,
  };
};

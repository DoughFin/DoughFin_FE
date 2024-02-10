import { gql, useQuery } from "@apollo/client";

export const GET_INCOMES = gql`
query GetIncomes($email: String!) {
  user(email: $email) {
      currentIncomes {
          amount
          pctChange
      }
  }
}`

export const useGetIncomes = (email) => {
  const { loading, error, data } = useQuery(GET_INCOMES, {
    variables: { email: email },
  });
  let totalIncomeData = null;
  if (!loading && data) {
    totalIncomeData = data?.user?.currentIncomes?.amount;
  }
  return { loading, error, totalIncomeData };
};
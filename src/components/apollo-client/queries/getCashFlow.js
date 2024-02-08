import { gql, useQuery } from "@apollo/client";

export const GET_CASH_FLOW = gql`
query getCashflows($email: String!) {
  user(email: $email) {
      id
      cashFlows {
          month
          year
          totalIncome
          totalExpense
      }
  }
}`

export const useGetCashFlow = (email) => {
  const { loading, error, data } = useQuery(GET_CASH_FLOW, {
    variables: { email: email },
  });
  let cashFlowData = null;
  if (!loading && data) {
    cashFlowData = data?.user?.cashFlows;
  }
  return { loading, error, cashFlowData };
};
import { gql, useQuery } from "@apollo/client";

export const CREATE_INCOME = gql`
mutation CreateIncome ($userId:ID!, $source:String!, $amount:Float!, $date:String!) {
  createIncome(
      userId:$userId,
      source:$source,
      amount:$amount,
      date:$date
  ) {
      userId
      source
      amount
      date
  }
}`

export const useCreateIncome = (userId, source, amount, date) => {
  const { loading, error, data } = useQuery(CREATE_INCOME, {
    variables: { userId: userId, sourcce: source, amount: amount, date: date },
  });
  let newIncomeData = null;
  if (!loading && data) {
    newIncomeData = data?.user?.currentIncome?.amount?.toFixed(2);
  }
  return { loading, error, newIncomeData };
};
import { gql, useMutation } from "@apollo/client";

export const CREATE_INCOME = gql`
mutation CreateIncome ($userId:ID!, $source:String!, $amount:Float!, $date:String!) {
  createIncome(
      userId:$userId,
      source:$source,
      amount:$amount,
      date:$date
  ) {
    userId
    income {
      id
      source
      amount
      date
  }
 }
}`

export const useCreateIncome = (userId, source, amount, date) => {
  const { loading, error, data } = useMutation(CREATE_INCOME, {
    variables: { userId: userId, source: source, amount: amount, date: date },
  });
  let newIncomeData = null;
  if (!loading && data) {
    newIncomeData = data?.user?.currentIncome?.income?.amount?.toFixed(2);
  }
  return { loading, error, newIncomeData };
};
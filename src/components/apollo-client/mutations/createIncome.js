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

export const useCreateIncome = () => {
  const [mutate, { data, loading, error }] = useMutation(CREATE_INCOME);
    const executeMutation = (userId, source, amount, date ) => mutate({userId, source, amount, date});
  return [executeMutation, { data, loading, error }];
};
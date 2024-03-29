import { gql, useQuery } from "@apollo/client";
import { useState, useEffect } from 'react';

export const GET_BUDGETS_BY_PARAMS = gql`
query GetBudgetsByParams($month: String!, $category: String!, $email: String!) {
  user(email: $email) {
      id
      budgets(month: $month, category: $category) {
          id
          month
          category
          amount
          pctRemaining
          amountRemaining
      }
      expenses(category: $category, month: $month) {
          id
          amount
          date
          category
      }
  }
}`

export const useGetBudgetsByParams = ( month, category, email ) => {
  const { loading, error, data } = useQuery(GET_BUDGETS_BY_PARAMS, {
    variables: { month: month, category: category, email: email },
  });

  let budgetsData = null;
  if (!loading && data) {
    budgetsData = {
      budgets: data.user?.budgets,
      expenses: data.user?.expenses,
    };
  }

  return { loading, error, budgetsData };
};
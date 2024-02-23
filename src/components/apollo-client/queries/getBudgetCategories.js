import { gql, useQuery } from "@apollo/client";

export const GET_BUDGET_CATEGORIES = gql`
query GetBudgetCategories($email: String!) {
    user(email: $email) {
        budgetCategories
    }
}`

export const useGetBudgetCategories= (email) => {
  const { loading, error, data } = useQuery(GET_BUDGET_CATEGORIES, {
    variables: { email: email },
    fetchPolicy: "no-cache"
  });
  let budgetCategoriesData = null;
  if (!loading && data) {
    budgetCategoriesData = data?.user?.budgetCategories || [];
  }

  return { loading, error, budgetCategoriesData };
};
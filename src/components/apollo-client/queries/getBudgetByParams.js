import {gql, useQuery} from "@apollo/client";

export const GET_BUDGET_BY_PARAMS = gql`
query GetBudgetsByParams($month: String!, $category: String!, $userId: ID!) {
    user(id: $userId) {
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

export const useGetBudgetsByParams = (month, category, userId) => {
    const { loading, error, data } = useQuery(GET_BUDGET_BY_PARAMS, {
        variables: { userId: userId, month: month, category: category },
    });
    let budgetData = null;
    if (!loading && data) {
        budgetData = data?.user;
    }
    return { loading, error, budgetData };
};

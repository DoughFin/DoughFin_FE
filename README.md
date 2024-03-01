# DoughFin_FE

## Introduction
DoughFin is a user-friendly financial management app designed to help individuals effortlessly track their income, categorize expenses, and create budgets. With DoughFin, managing your finances becomes intuitive, empowering you to make informed decisions about your money.

![alt text](<Screen Shot 2024-02-29 at 2.20.26 PM.png>)

## Features
**Income Tracking:** Automatically track your income from various sources to see how much you're earning.<br>
**Expense Categorization:** Automatically categorize your expenses for a clearer understanding of your spending habits.<br>
**Budget Creation:** Set up personalized budgets to control your spending and achieve your financial goals.<br>
**Insightful Reports:** Get detailed reports and insights into your financial health, helping you make better financial decisions.<br>
**Light & Dark Mode** Use the toggle on the left hand navbar to toggle between light and dark mode!

### Setup & Installation

Get **DoughFin** running on your machine:

1. Clone the repository from: `git@github.com:DoughFin/DoughFin_FE.git`
2. Move to the project directory:
 ```bash
cd DoughFin_FE
``` 
3. Grab the dependencies: `npm install`
 ```bash
npm install
``` 
5. Fire up the app: `npm start`
```bash
npm start
``` 
----------------

## To Run Tests
```bash
npm cypress open
```

## Configuration
* port deconfliction
  * react app localhost:3003
  * rails api localhost:3000

## Environments Required
[NodeJS](https://nodejs.org/en)

## Packages Required
[apollo](https://www.npmjs.com/package/@apollo/client)
[mui](https://www.npmjs.com/package/@mui/material)
[graphql](https://www.npmjs.com/package/graphql)
[cypress](https://www.npmjs.com/package/cypress)

### Further Details
#### CashFlow Widget
> Users can track their expenses and incomes over the course of the past year. CashFlows are the total incomes and expenses for each month, displayed in a Bar Chart. They are handled by a GraphQL query to the Back-End application in the following format:
```
query GetUserCashflow($userId: ID!) {
  cashFlow(userId: $userId) {
      username
      years {
          year
          months {
              month
              income
              expenses
          }
     }
  }
}
```
#### Transactions Widget
> Users can track all expenses and incomes within this widget. Transactions include Name (company name), Category (either income or budget category), Date, Amount (in USD), and Status (Credited for incomes, Debited for expenses). Users can also search within any of these parameters using the search function.
```
query getTransactions($email: String!) {
  user(email: $email) {
      id
      transactions {
          id
          amount
          date
          category
          vendor
          status
      }
  }
}
```

#### Total Income and Expenses Widget
> Users can view their total incomes and expenses over all time within this widget, which uses the following GraphQL queries for income and expense, respectively:
```
query GetIncomes($email: String!) {
  user(email: $email) {
      currentIncomes {
          amount
          pctChange
      }
  }
}
```

```
query GetExpenses($email: String!) {
  user(email: $email) {
      currentExpenses {
          amount
          pctChange
      }
  }
}
```
#### Income and Expense Creation
> Users can create incomes and expenses by clicking on the '+' icon next to each total income and expense. Incomes include the following parameters: Source, Date, and Amount, while Expenses include Vendor, Category, Date and Amount. Amount will only allow numeric inputs. The GraphQL mutations are as follows:

```
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
}
```

```
mutation CreateExpense($userId: ID!, $vendor: String!, $category: String!, $amount: Float!, $date: String!) {
    createExpense(input: {
        userId: $userId,
        vendor: $vendor,
        category: $category,
        amount: $amount,
        date: $date
    }) {
        userId
        expense {
            id
            vendor
            category
            amount
            date
        }
    }
}
```


#### Budget Widget
> Users can set custom budgets, which will track the remaining amount left to spend within that budget, which is updated when an expense is made in a particular category. Budget categories are provided using the first GraphQL query, while budget data per budget is handled with the second query.
```
query GetBudgetCategories($email: String!) {
    user(email: $email) {
        budgetCategories
    }
}
```

```
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
}
```

## Acknowledgments
Thank you to all the contributors who have helped shape DoughFin.
Special thanks to our users for trusting us with their financial management needs.

Shawn Carpenter: [Email](shawncarpenter.co@gmail.com) [LinkedIn](https://www.linkedin.com/in/shawndcarpenter/)

Joseph Lee: [Email](jhjlee702@gmail.com)

Mary Bruff: [Email](marybruff5@gmail.com)

Taylor Pubins: [Email](tpubz@icloud.com)

Anthea Yur: [Email](acyur6@gmail.com)

Ben Rosner: [Email](ben.rosner.williamsburg@gmail.com)
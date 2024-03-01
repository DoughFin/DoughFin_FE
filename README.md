# DoughFin_FE

## Introduction
DoughFin is a user-friendly financial management app designed to help individuals effortlessly track their income, categorize expenses, and create budgets. With DoughFin, managing your finances becomes intuitive, empowering you to make informed decisions about your money.

![alt text](<Screenshot 2024-02-29 at 8.32.41 PM.png>)

## Features
**Income Tracking:** Automatically track your income from various sources to see how much you're earning.<br>
**Expense Categorization:** Automatically categorize your expenses for a clearer understanding of your spending habits.<br>
**Budget Creation:** Set up personalized budgets to control your spending and achieve your financial goals.<br>
**Insightful Reports:** Get detailed reports and insights into your financial health, helping you make better financial decisions.<br>
**Secure Account Linking:** Safely link your bank account(s) for real-time transaction updates.<br>
**Light & Dark Mode** Use the toggle on the left hand navbar to toggle between light and dark mode!<br>
**CSV Export:** Export transaction information into CSV for your own use!

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

4. Install the react-switch for dark mode: `npm install react-switch --save`
 ```bash
npm install react-switch --save
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


## Acknowledgments
Thank you to all the contributors who have helped shape DoughFin.
Special thanks to our users for trusting us with their financial management needs.

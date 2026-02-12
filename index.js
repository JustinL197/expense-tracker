const {addTransaction, listTransactions} = require('./expense');

console.log("Expense tracker running...");

addTransaction('Timmies', 'Food', 100);

listTransactions();


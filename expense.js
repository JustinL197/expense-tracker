/*
expense tracker -- version 0
- high-level replication of app and its functionality
- data will be maintained in an array
- expense will be an object with properties:
    * title: string
    * category: string
    * amount: number
    * date: Date object 
- will contain 3 basic functions:
    * add transaction
    * delete transaction
    * display all transactions
*/

let transactions = [];
let uniqueID = 0;

function addTransaction(title, category, amount){
    let expense = {
        id: uniqueID++,
        title: title,
        category: category,
        amount: amount,
        timestamp: formattedDate()
    }

    transactions.push(expense);
}

function formattedDate(){
    let date = new Date();
    let year = date.getFullYear(), month = date.getMonth() + 1, day = date.getDate(); 

    if (month.toString().length < 2){
        month = '0' + month;
    }

    if (day.toString().length < 2){
        day = '0' + day;
    }

    let timestamp = `${year.toString()}-${month}-${day}`;

    return timestamp;
}

function deleteTransaction(id){
   let new_transactions = [];
   for (expense of transactions){
      if (expense.id != id){
         new_transactions.push(expense)
      }
   }
   transactions = new_transactions;
}

function listTransactions(){
    console.log(transactions);
}

module.exports = {
   addTransaction,
   listTransactions,
   deleteTransaction
};

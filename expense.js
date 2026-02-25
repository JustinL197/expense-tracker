/*
expense tracker -- version 0
- high-level replication of app and its functionality
- data will be maintained in an array
- expense will be an object with properties:
    * title: string
    * category: string
    * amount: number
    * timestamp: string
- will contain 3 basic functions:
    * add transaction
    * delete transaction
    * display all transactions
*/
const fs = require('fs');
const crypto = require('crypto');


let transactions = JSON.parse(fs.readFileSync('./transactions.json', 'utf-8'));

function addTransaction(title, category, amount){
   let converted_amount = Number(amount)
   
    let expense = {
        id: crypto.randomUUID(),
        title: title,
        category: category,
        amount: converted_amount,
        timestamp: formattedDate()
    }

    transactions.push(expense);
    fs.writeFileSync('./transactions.json', JSON.stringify(transactions));
    return true
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
   let modified_transaction_list = []
   let isFound = false;
   
   for (let expense of transactions){
      if (expense.id !== id){
         modified_transaction_list.push(expense);
      } else{
         //transaction found and deleted
         isFound = true;
      }
   }

   fs.writeFileSync('transactions.json', JSON.stringify(modified_transaction_list))
   return (isFound);
}

function listTransactions(){
   const data = fs.readFileSync('./transactions.json', 'utf-8');
   const parsedData = JSON.parse(data);

   return parsedData;
}

module.exports = {
   addTransaction,
   listTransactions,
   deleteTransaction
};

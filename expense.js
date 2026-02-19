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

let transactions = [];
let uniqueID = 0;

function addTransaction(title, category, amount){
   let converted_amount = Number(amount)
   let expense = {
        id: uniqueID++,
        title: title,
        category: category,
        amount: converted_amount,
        timestamp: formattedDate()
    }
   
   transactions.push(expense);
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
   let valid_id = Number(id)
   let isFound = false;
   
   if (!Number.isInteger(valid_id)){
      // invalid transaction
      return false
   }
   
   for (let expense of transactions){
      if (expense.id !== valid_id){
         modified_transaction_list.push(expense);
      } else{
         //transaction found and deleted
         isFound = true;
      }
   }

   transactions = modified_transaction_list;

   return (isFound);
}

function listTransactions(){
   return (transactions);
}

module.exports = {
   addTransaction,
   listTransactions,
   deleteTransaction
};

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
const {database} = require('./database');


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

function deleteTransaction(inputNumber){
   
   let deleted_expense = transactions.splice(Number(inputNumber) - 1, 1 );

   fs.writeFileSync('transactions.json', JSON.stringify(transactions))
   return (deleted_expense.length > 0)
}

async function listExpenses(){
    try{
        const expense_list = await database.expenses.findMany();
        return expense_list;

    }catch(error){
        console.log(error)
        throw error;
    }
}

module.exports = {
   addTransaction,
   listExpenses,
   deleteTransaction
};

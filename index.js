const {addTransaction, listExpenses, deleteTransaction} = require('./expense');
const readline = require('readline/promises');
const {stdin, stdout} = require('process');

const rl = readline.createInterface({
    input: stdin,
    output: stdout,
});

async function getExpenseTitle(){
    let expenseTitle;
    while (true){
        try{
            expenseTitle = await rl.question("Expense...");
            if (!expenseTitle){
                throw new Error("Cannot be empty")
            }
            break;
        } catch(err){
            console.log(err)
        }
    }
    return expenseTitle
}

async function getExpenseAmount(){
    let expenseAmount;
    while (true){
        try{
            expenseAmount = await rl.question("Amount...");
            if (!expenseAmount || !Number.isFinite(Number(expenseAmount))){
                throw new Error("Must be a number");
            }
            break;
        } catch(err){
            console.log(err)
        }
    }
    return Number(expenseAmount)
}

async function getExpenseCategory(){
    let expenseCategory;
    while (true){
        try{
            expenseCategory = await rl.question("Category...");
            if (!expenseCategory){
                throw new Error("Cannot be empty")
            }
            break;
        } catch(err){
            console.log(err)
        }
    }
    return expenseCategory
}

async function getDeleteId(){
    let id;
    while (true){
        try{
            id = await rl.question("Enter ID to delete...");
            if (!Number.isFinite(Number(id))){
                throw new Error("ID must be a number");
            }
            break;
        } catch(err){
            console.log(err)
        }
    }
    return Number(id)
}

(async function(){
    if (process.argv[2] === 'add'){
        try{
            let title = await getExpenseTitle();
            let category = await getExpenseCategory();
            let amount = await getExpenseAmount();

            if (await addTransaction(title, category, amount)){
                console.log('Expense added successfully')
            }
        }catch(err){
            console.log(err)
        }finally{
            rl.close()
        }
    }
})();

(async function(){
    if (process.argv[2] === 'list'){
        try{
            const expense_list = await listExpenses();

            if (expense_list.length == 0){
                console.log("No expenses to display")
                return 
            }

            let index = 1;
            for (let expense of expense_list){
                console.log(`${index++}...${expense.title}....${expense.amount}....${expense.timestamp}`)
            }
        }catch(error){
            console.log(error)
        }finally{
            process.exit()
        }
    }
})();


(async function(){
    if (process.argv[2] === 'del'){
        try{
            let deleted_id = await getDeleteId();

            if (await deleteTransaction(deleted_id)){
                 console.log("Transaction successfully deleted");
            }
           
        }catch(err){
            console.log(err)
        }finally{
            rl.close()
        }
    }
})();

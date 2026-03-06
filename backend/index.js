const express = require('express');
const {addTransaction, listExpenses, deleteTransaction } = require('../expense');

//initialize Express app - create and configure
const app = express();

//start connection on port 3000
app.listen(3000, () => {
    console.log('Server running on port 3000');
});

//middleware that takes raw request body and parses it from JSON into javascript object
app.use(express.json());

app.get('/expenses', async (req, res) => {
    try{
        const expense_list = await listExpenses();
        res.json(expense_list);
    }catch(error){
        console.log(error)
        res.status(500).send('Server error');
    }
});

app.post('/expenses', async (req, res) => {
    try{
        let title = req.body.title
        let category = req.body.category
        let amount = req.body.amount

        await addTransaction(title, category, amount);
        res.status(201).send("Added successfully")

    }catch(error){
        console.log(error);
        res.status(500).send('Server error');
    }
})

app.delete('/expenses/:id', async (req, res) => {
    try{
        let expenseId = Number(req.params.id);
        await deleteTransaction(expenseId)
        res.send("transaction deleted successfully");
    }catch(error){
        console.log(error);
        res.status(404).send('transaction does not exist')
    }
})
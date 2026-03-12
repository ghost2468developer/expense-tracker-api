const express = require('express');
const router = express.Router();
// const authUser = require('../middlewares/auth');
const expenseController = require('../controllers/expense.controller');

//Get all expenses
router.get('/',expenseController.getAllExpenses);

//Create an expense
router.post('/create', expenseController.createExpense);

//Updated expense
router.put('/expense/update/:id', expenseController.updateExpense);

//Get expense by ID
router.get('/expense/:id',expenseController.getExpenseById);

//Delete expense by id
router.delete('/expense/:id', expenseController.deleteExpenseById);

module.exports = router;
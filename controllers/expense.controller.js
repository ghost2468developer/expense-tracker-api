const mongoose = require('mongoose');

const Expense = require('../models/expense.model');

class expenseController{
    static getAllExpenses(req, res){
        Expense.find().then(expenses => res.status(200).json(expenses)).catch(err=> res.status(400).json(`Error:${err}`));
    }
    static createExpense(req,res){
        const {description, payment,category,amount }= req.body;
        const date = Date.parse(req.body.date);
        const newExpense = new Expense({
            _id: new mongoose.Types.ObjectId(),
            description,
            category,
            payment,
            amount,
            date
        });
        newExpense.save()
        .then(()=> res.status(201).json({
            message:'Expense added',
            expenseAdded: newExpense
        }))
        .catch(err => res.status(500).json(err));
    };
    
    static updateExpense(req,res){
        Expense.findById(req.params.id)
    .then(expense =>{
        expense.description = req.body.description;
        expense.category = req.body.category;
        expense.payment = req.body.payment;
        expense.amount = req.body.amount;
        expense.date = Date.parse(req.body.date);
        expense.save()
        .then(()=> res.status(201).json({
            message:'Expense Updated',
            UpdatedExpense:expense
        }))
        .catch(err => res.status(404).json('Error'+ err))
    })
    .catch(err => res.status(500).json(err));
    }

    static getExpenseById(req, res){
        Expense.findById(req.params.id)
            .then(expense=> res.status(200).json(expense))
            .catch(err => res.status(404).json(err));
    }

    static deleteExpenseById(req, res){
        Expense.findByIdAndDelete(req.params.id)
        .then(()=> res.status(200).json('Expense Deleted'))
        .catch(err => res.status(404).json(err))
    }

}

module.exports = expenseController;
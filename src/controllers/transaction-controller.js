import { supabase } from '../lib/supabase.js'

// Create Transaction
export const createTransaction = async (req, res) => {
  const { amount, type, category_id, note, transaction_date } = req.body
  const user_id = req.user.id

  if (!amount || !type || !['income', 'expense'].includes(type)) {
    return res.status(400).json({ message: 'Amount and valid type required' })
  }

  const { data, error } = await supabase
    .from('transactions')
    .insert([{ amount, type, category_id, note, transaction_date, user_id }])
    .select()
    .single()

  if (error) return res.status(500).json({ error: error.message })
  res.status(201).json(data)
}

// Get all transactions
export const getTransactions = async (req, res) => {
  const user_id = req.user.id
  const { data, error } = await supabase
    .from('transactions')
    .select('*, category:categories(name)')
    .eq('user_id', user_id)
    .order('transaction_date', { ascending: false })

  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
}

// Update Transaction
export const updateTransaction = async (req, res) => {
  const { id } = req.params
  const { amount, type, category_id, note, transaction_date } = req.body
  const user_id = req.user.id

  const { data, error } = await supabase
    .from('transactions')
    .update({ amount, type, category_id, note, transaction_date })
    .eq('id', id)
    .eq('user_id', user_id)
    .select()
    .single()

  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
}

// Delete Transaction
export const deleteTransaction = async (req, res) => {
  const { id } = req.params
  const user_id = req.user.id

  const { error } = await supabase
    .from('transactions')
    .delete()
    .eq('id', id)
    .eq('user_id', user_id)

  if (error) return res.status(500).json({ error: error.message })
  res.status(204).send()
}

// Report: total income, expenses, balance
export const getReport = async (req, res) => {
  const user_id = req.user.id
  const { start_date, end_date } = req.query

  let query = supabase.from('transactions').select('*').eq('user_id', user_id)

  if (start_date) query = query.gte('transaction_date', start_date)
  if (end_date) query = query.lte('transaction_date', end_date)

  const { data, error } = await query
  if (error) return res.status(500).json({ error: error.message })

  const income = data.filter(t => t.type === 'income').reduce((a,b) => a + Number(b.amount), 0)
  const expense = data.filter(t => t.type === 'expense').reduce((a,b) => a + Number(b.amount), 0)
  const balance = income - expense

  res.json({ total_income: income, total_expense: expense, balance, transactions: data })
}
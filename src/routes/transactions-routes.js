import { Router } from 'express'
import { authenticate } from '../middleware/auth.js'
import {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
  getReport
} from '../controllers/transactions.controller.js'

const router = Router()
router.use(authenticate)

router.post('/', createTransaction)          // Create
router.get('/', getTransactions)             // List all
router.put('/:id', updateTransaction)        // Update
router.delete('/:id', deleteTransaction)     // Delete
router.get('/report', getReport)             // Report: totals

export default router
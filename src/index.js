import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import authRoutes from './routes/auth-routes.js'
import categoriesRoutes from './routes/categories-routes.js'
import transactionRoutes from './routes/transactions-routes.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/categories', categoriesRoutes)
app.use('/api/transactions', transactionRoutes)

// Root endpoint
app.get('/', (req, res) => {
  res.send('Expense Tracker API running 🚀')
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
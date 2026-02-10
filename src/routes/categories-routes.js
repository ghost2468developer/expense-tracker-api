import { Router } from 'express'
import { authenticate } from '../middleware/auth.js'
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory
} from '../controllers/categories.controller.js'

const router = Router()
router.use(authenticate)

router.post('/', createCategory)
router.get('/', getCategories)
router.put('/:id', updateCategory)
router.delete('/:id', deleteCategory)

export default router
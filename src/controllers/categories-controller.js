import { supabase } from '../lib/supabase.js'

export const createCategory = async (req, res) => {
  const { name } = req.body
  const user_id = req.user.id
  if (!name) return res.status(400).json({ message: 'Name required' })

  const { data, error } = await supabase
    .from('categories')
    .insert([{ name, user_id }])
    .select()
    .single()

  if (error) return res.status(500).json({ error: error.message })
  res.status(201).json(data)
}

export const getCategories = async (req, res) => {
  const user_id = req.user.id
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('user_id', user_id)

  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
}

export const updateCategory = async (req, res) => {
  const { id } = req.params
  const { name } = req.body
  const user_id = req.user.id

  const { data, error } = await supabase
    .from('categories')
    .update({ name })
    .eq('id', id)
    .eq('user_id', user_id)
    .select()
    .single()

  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
}

export const deleteCategory = async (req, res) => {
  const { id } = req.params
  const user_id = req.user.id

  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id)
    .eq('user_id', user_id)

  if (error) return res.status(500).json({ error: error.message })
  res.status(204).send()
}
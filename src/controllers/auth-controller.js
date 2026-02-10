import { supabase } from '../lib/supabase.js'

export const registerUser = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) return res.status(400).json({ message: 'Email & password required' })

  const { data, error } = await supabase.auth.signUp({ email, password })

  if (error) return res.status(400).json({ error: error.message })

  res.status(201).json({ message: 'User registered!', user: data.user })
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) return res.status(400).json({ message: 'Email & password required' })

  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) return res.status(401).json({ error: error.message })

  res.json({ access_token: data.session.access_token, user: data.user })
}
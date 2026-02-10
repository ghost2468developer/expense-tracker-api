import { supabase } from '../lib/supabase.js'

export const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'Missing token' })

  const { data, error } = await supabase.auth.getUser(token)
  if (error) return res.status(401).json({ message: 'Invalid token' })

  req.user = data.user
  next()
}
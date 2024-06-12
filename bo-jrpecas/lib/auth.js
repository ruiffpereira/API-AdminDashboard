// lib/auth.js
import bcrypt from 'bcrypt'

export async function hashPassword(password) {
  const salt = await bcrypt.genSalt(12)
  return bcrypt.hash(password, salt)
}

export async function verifyPassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword)
}

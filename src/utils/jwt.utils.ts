// src/utils/jwt.utils.ts
import jwt from 'jsonwebtoken'

const secretKey = process.env.JWT_SECRET!

export const generateToken = (userId: number): string => {
  const payload = { userId }
  return jwt.sign(payload, secretKey, { expiresIn: '1h' })
}

export const verifyToken = (token: string): jwt.JwtPayload | string => {
  return jwt.verify(token, secretKey)
}

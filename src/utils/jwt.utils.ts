// src/utils/jwt.utils.ts
import jwt from 'jsonwebtoken'
import { JWTPayLoad } from 'types/jwt.payload.type'


export const generateToken = (payLoad: JWTPayLoad): string => {
  return jwt.sign(payLoad, process.env.JWT_SECRET!, {
    subject: payLoad.sessionId,
    expiresIn: `${process.env.JWT_EXPIRATION_DAYS || 5} days`,
  })
}

export const verifyToken = (token: string): jwt.JwtPayload | string => {
  return jwt.verify(token, process.env.JWT_SECRET!)
}

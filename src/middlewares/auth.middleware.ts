// src/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../utils/jwt.utils'
import { CustomError } from '../utils/CustomError'
import logger from '../utils/logger'

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const token = req.headers.authorization?.split(' ')[1] // Bearer TOKEN
    if (!token) {
      throw new CustomError('Authentication token not provided', 401)
    }

    const decoded = verifyToken(token)
    logger.info('Decoded token', decoded)
    // req.user = { id: decoded.userId }; // Add user details to request
    next()
  } catch (error) {
    next(new CustomError('Invalid or expired token', 401))
  }
}

// src/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../utils/jwt.utils'
import { CustomError } from '../utils/CustomError'
import logger from '../utils/logger'

export const AuthenticateMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const token = req.cookies.permission
    if (!token) {
      throw new CustomError(401, 'Authentication token not provided')
    }

    const decoded = verifyToken(token)
    logger.info('Decoded token', decoded)
    next()
  } catch (error) {
    next(new CustomError(401, 'Invalid or expired token'))
  }
}

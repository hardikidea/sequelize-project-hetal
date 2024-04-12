import { body } from 'express-validator'

export const ValidationForLoginRequest = [
  body('email').isEmail().notEmpty().withMessage('Please provide a valid email'),
  body('password').notEmpty().isLength({ min: 8 }).withMessage('Incorrect password'),
]

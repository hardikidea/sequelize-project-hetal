// validations/userValidation.ts
import { body, query } from 'express-validator';

export const validationForLoginRequest = () => {
  return [
    // body('username').not().isEmpty().withMessage('Username is required'),
    // body('password').not().isEmpty().withMessage('Password is required'),
    body('email').isEmail().notEmpty().withMessage('Please provide a valid email'),
    body('password').notEmpty().isLength({ min: 8 }) .withMessage('Incorrect password'),
  ];
}

export const validationForPagination = () => {
  return [
    query('page').isInt({ min: 1 }).withMessage('Page must be a positive integer.').toInt(),
    query('limit').isInt({ min: 1 }).withMessage('Limit must be a positive integer.').toInt(),
  ];
}

export const validationForId = () => {
  return [
    query('id').isInt({ min: 1 }).withMessage('Page must be a positive integer.').toInt()
  ];
}

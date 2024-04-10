import { query } from "express-validator"

export const ValidationForPagination = () => {
    return [
      query('page').isInt({ min: 1 }).withMessage('Page must be a positive integer.').toInt(),
      query('limit').isInt({ min: 1 }).withMessage('Limit must be a positive integer.').toInt(),
    ]
  }
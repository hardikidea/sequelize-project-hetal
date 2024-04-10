import { query } from "express-validator"

export const ValidationForId = () => {
    return [query('id').isInt({ min: 1 }).withMessage('Page must be a positive integer.').toInt()]
  }
  
import { param } from 'express-validator'

export const ValidationForId = [param('id').isInt({ min: 1 }).withMessage('id must be a positive integer.').toInt()]

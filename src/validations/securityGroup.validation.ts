import { body } from 'express-validator'

export const ValidationForCreateSecurityGroup = [
  body('name').notEmpty().isString().withMessage(`Security Group Name is required.`),
  body('description').notEmpty().isString().withMessage(`Security Group Description is required.`),
]

import { check } from 'express-validator'

export const listValidations = [
  check('name')
    .notEmpty()
    .withMessage('List name is required'),
  check('userId')
    .notEmpty()
    .withMessage('Album ID is required')
    .isInt()
    .withMessage('Artist ID shuld be an integer')
]

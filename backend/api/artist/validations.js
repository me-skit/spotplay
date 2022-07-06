import { check } from 'express-validator'

export const artistValidations = [
  check('name')
    .notEmpty()
    .withMessage('Artist name is required')
]

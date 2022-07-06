import { check } from 'express-validator'

export const genreValidations = [
  check('name')
    .notEmpty()
    .withMessage('Genre name is required')
]

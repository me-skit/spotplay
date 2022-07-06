import { check } from 'express-validator'

export const albumValidations = [
  check('name')
    .notEmpty()
    .withMessage('Album name is required'),
  check('year')
    .optional()
    .isInt()
    .withMessage('Year should be numeric'),
  check('artistId')
    .notEmpty()
    .withMessage('Artist ID is required')
    .isInt()
    .withMessage('Artist ID should be an integer')
]

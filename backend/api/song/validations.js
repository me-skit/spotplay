import { check } from 'express-validator'

const regex = /^(10|11|12|[1-9]):[0-5][0-9](:[0-5][0-9])?$/

export const songValidations = [
  check('title')
    .notEmpty()
    .withMessage('Title is required'),
  check('uri')
    .notEmpty()
    .withMessage('URI is required'),
  check('duration')
    .optional()
    .matches(regex)
    .withMessage('Duration shoul have the right HH:mm:ss format'),
  check('year')
    .optional()
    .isInt()
    .withMessage('Song year should be numeric'),
  check('artistId')
    .optional()
    .notEmpty()
    .withMessage('Artist ID should not be empty'),
  check('genreId')
    .optional()
    .notEmpty()
    .withMessage('Genre ID should not be empty'),
  check('albumId')
    .optional()
    .notEmpty()
    .withMessage('Album ID should not be empty')
]

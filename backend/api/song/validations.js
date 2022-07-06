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
    .notEmpty()
    .withMessage('Artist ID is required')
    .isInt()
    .withMessage('Artist ID should be an integer'),
  check('genreId')
    .notEmpty()
    .withMessage('Genre ID is required')
    .isInt()
    .withMessage('Genre ID should be an integer'),
  check('albumId')
    .notEmpty()
    .withMessage('Album ID is required')
    .isInt()
    .withMessage('Album ID should be an integer')
]

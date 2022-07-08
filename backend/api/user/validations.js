import { check } from 'express-validator'

export const userValidations = [
  check('username')
    .notEmpty()
    .withMessage('Username is required'),
  check('email')
    .optional()
    .isEmail(),
  check('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password length should be at list 8 chars')
    .matches(/\d/)
    .withMessage('Password should have at least one number')
    .matches(/[¡!@#$%^&*(),.?":{}|<>]/)
    .withMessage('Password should have at least one sepcial character'),
  check('role')
    .notEmpty()
    .withMessage('Role is required')
    .matches(/(admin|reader|editor)/)
    .withMessage('Role should be admin, reader or editor')
]

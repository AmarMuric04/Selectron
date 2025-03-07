import express from 'express'
import * as UserController from '../controllers/user'
import { body } from 'express-validator'

const router = express.Router()

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Enter a valid email.'),
    body('password').isLength({ min: 9 }).withMessage('Password must be at least 9 characters long')
  ],

  UserController.logIn
)

router.post(
  '/signup',
  [
    body('email').isEmail().withMessage('Enter a valid email.'),
    body('username')
      .isLength({ min: 5 })
      .withMessage('Username must be at least 5 characters long'),
    body('password').isLength({ min: 9 }).withMessage('Password must be at least 9 characters long')
  ],
  UserController.signUp
)

export default router

import bcrypt from 'bcryptjs'
import User from '../../database/models/user'
import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator'

export const signUp = async (req, res, next) => {
  try {
    let { password, email, username } = req.body

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const error = new Error('Validation Error')
      error.data = errors.array()
      error.statusCode = 422
      throw error
    }

    const alreadyExists = await User.findOne({ email })
    if (alreadyExists) {
      const error = new Error('A user with that email already exists.')
      error.statusCode = 409
      error.data = [{ path: 'email', msg: error.message }]
      throw error
    }

    const salt = await bcrypt.genSalt(10)
    password = await bcrypt.hash(password, salt)

    const newUser = new User({ password, email, username })

    const token = jwt.sign({ _id: newUser._id, email: newUser.email }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    })

    await newUser.save()

    res.status(201).json({
      success: true,
      message: 'Successfully signed up!',
      data: { user: newUser, token }
    })
  } catch (err) {
    next(err)
  }
}
export const logIn = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const error = new Error('Validation Error')
      error.data = errors.array()
      error.statusCode = 422
      throw error
    }

    const user = await User.findOne({ email })
    if (!user) {
      const error = new Error('A user with this email does not exist.')
      error.statusCode = 404
      error.data = [{ path: 'email', msg: error.message }]
      throw error
    }

    const equalPasswords = await bcrypt.compare(password, user.password)
    if (!equalPasswords) {
      const error = new Error('Invalid credentials.')
      error.statusCode = 401
      error.data = [
        { path: 'email', msg: 'Incorrect email or password.' },
        { path: 'password', msg: 'Incorrect email or password.' }
      ]
      throw error
    }

    const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    })

    res.status(200).json({
      success: true,
      message: 'Successfully logged in as: ' + user.username,
      data: { user, token }
    })
  } catch (err) {
    next(err)
  }
}
export const autoLogIn = async (req, res, next) => {
  try {
    const { userId } = req.body

    const user = await User.findById(userId)

    if (!user) {
      const error = new Error('No user found with that id...')
      error.statusCode = 404

      throw error
    }

    res.status(200).json({ message: 'Successfully auto signed in!', data: user })
  } catch (err) {
    next(err)
  }
}

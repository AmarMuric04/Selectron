import express from 'express'
import * as UserController from '../controllers/user'

const router = express.Router()

router.post('/login')

router.post('/signup', UserController.signUp)

export default router

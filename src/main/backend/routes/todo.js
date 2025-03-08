import express from 'express'
import * as TodoController from '../controllers/todo'
import isAuth from '../middleware/is-auth'

const router = express.Router()

router.post('/add-todo', isAuth, TodoController.addTodo)

router.get('/get-todos', isAuth, TodoController.getTodos)

export default router

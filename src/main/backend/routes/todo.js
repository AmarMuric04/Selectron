import express from 'express'
import * as TodoController from '../controllers/todo'
import isAuth from '../middleware/is-auth'

const router = express.Router()

router.post('/add-todo', isAuth, TodoController.addTodo)

router.get('/get-todos', isAuth, TodoController.getTodos)

router.post('/complete-todo', isAuth, TodoController.completeTodo)

router.post('/uncomplete-todo', isAuth, TodoController.uncompleteTodo)

router.delete('/delete-todo/:todo', isAuth, TodoController.deleteTodo)

router.put('/edit-todo/:todo', isAuth, TodoController.ediTodo)

export default router

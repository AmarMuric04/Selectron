import Todo from '../../database/models/todo'
import User from '../../database/models/user'

export const addTodo = async (req, res, next) => {
  try {
    const { todo } = req.body
    const thisUser = await User.findById(req.userId)

    if (!thisUser) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }

    const newTodo = new Todo({
      todo,
      user: thisUser._id
    })

    await newTodo.save()

    thisUser.todos.uncompleted.push(newTodo._id)
    await thisUser.save()

    console.log(thisUser)

    res.status(201).json({ success: true, message: 'Successfully added a todo!', data: newTodo })
  } catch (err) {
    next(err)
  }
}

export const getTodos = async (req, res, next) => {
  try {
    const thisUser = await User.findById(req.userId)
      .populate({
        path: 'todos.uncompleted',
        model: 'Todo'
      })
      .populate({
        path: 'todos.completed',
        model: 'Todo'
      })

    if (!thisUser) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }

    res.status(200).json({
      success: true,
      message: 'Successfully got the todos!',
      data: thisUser.todos
    })
  } catch (err) {
    next(err)
  }
}

export const completeTodo = async (req, res, next) => {
  try {
    const thisUser = await User.findById(req.userId)

    if (!thisUser) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }

    const { todo } = req.body

    thisUser.todos.uncompleted = thisUser.todos.uncompleted.filter((t) => t.toString() !== todo)

    thisUser.todos.completed.push(todo)

    await thisUser.save()

    res.status(200).json({ success: true, message: 'Successfully completed a todo!' })
  } catch (err) {
    next(err)
  }
}

export const uncompleteTodo = async (req, res, next) => {
  try {
    const thisUser = await User.findById(req.userId)

    if (!thisUser) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }

    const { todo } = req.body

    thisUser.todos.completed = thisUser.todos.completed.filter((t) => t.toString() !== todo)

    thisUser.todos.uncompleted.push(todo)

    await thisUser.save()

    res.status(200).json({ success: true, message: 'Successfully uncompleted a todo!' })
  } catch (err) {
    next(err)
  }
}

export const ediTodo = async (req, res, next) => {
  try {
    const thisUser = await User.findById(req.userId)

    if (!thisUser) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }

    const { todo } = req.params
    const { newTodo } = req.body

    await Todo.findByIdAndUpdate(todo, { $set: { todo: newTodo } })

    res.status(200).json({ success: true, message: 'Successfully edited the todo' })
  } catch (err) {
    next(err)
  }
}

export const deleteTodo = async (req, res, next) => {
  try {
    const thisUser = await User.findById(req.userId)

    if (!thisUser) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }

    const { todo } = req.params

    const wasUncompleted = thisUser.todos.uncompleted.some((t) => t.toString() === todo)
    const wasCompleted = thisUser.todos.completed.some((t) => t.toString() === todo)

    if (wasUncompleted) {
      thisUser.todos.uncompleted = thisUser.todos.uncompleted.filter((t) => t.toString() !== todo)
    } else if (wasCompleted) {
      thisUser.todos.completed = thisUser.todos.completed.filter((t) => t.toString() !== todo)
    } else {
      return res.status(404).json({ success: false, message: 'Todo not found' })
    }

    await Todo.findByIdAndDelete(todo)

    await thisUser.save()

    res.status(200).json({ success: true, message: 'Successfully deleted the todo' })
  } catch (err) {
    next(err)
  }
}

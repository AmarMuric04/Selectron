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

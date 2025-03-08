import Todo from '../../database/models/todo'

export const addTodo = (req, res, next) => {
  try {
    const { todo } = req.body

    const newTodo = await new Todo({
      creator: "Murga",
    })
  } catch (err) {
    next(err)
  }
}

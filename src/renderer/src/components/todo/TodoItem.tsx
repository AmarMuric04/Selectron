import { setCompleted, setNewTodosValue, setUncompleted } from '@renderer/store/todoSlice'
import React, { useState } from 'react'
import { FaEdit, FaPlay } from 'react-icons/fa'
import { MdCheckBox, MdCheckBoxOutlineBlank, MdDelete } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import AddTodo from './AddTodo'

const TodoItem: React.FC<{
  completed: boolean
  todo: string
}> = ({ completed, todo }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(todo.todo)
  const dispatch = useDispatch()
  const { newTodosValue } = useSelector((state) => state.todo)

  return (
    <li>
      {isEditing && (
        <AddTodo
          onSave={() => {
            if (newTodosValue.trim()) {
              setValue(newTodosValue)
              setIsEditing(false)
            }
          }}
          onCancel={() => setIsEditing(false)}
        />
      )}
      {!isEditing && (
        <article className="px-4 py-2 hover:bg-zinc-800 transition-all flex justify-between items-center">
          <div className="flex items-center gap-2">
            <button
              className="cursor-pointer"
              onClick={() => {
                if (completed) {
                  dispatch(setUncompleted({ ...todo, todo: value }))
                } else dispatch(setCompleted({ ...todo, todo: value }))
              }}
            >
              {completed ? (
                <MdCheckBox />
              ) : (
                <MdCheckBoxOutlineBlank size={18} className="hover:text-zinc-400 transition-all" />
              )}
            </button>
            <p>{value}</p>
          </div>
          <ul className="flex items-center gap-2">
            <li className="hover:text-zinc-400 transition-all cursor-pointer">
              <FaPlay size={12} />
            </li>
            <li className="hover:text-zinc-400 transition-all cursor-pointer">
              <button
                aria-label="Edit this todo"
                onClick={() => {
                  setIsEditing(true)
                  dispatch(setNewTodosValue(value))
                }}
              >
                <FaEdit size={14} />
              </button>
            </li>
            <li className="hover:text-zinc-400 transition-all cursor-pointer">
              <MdDelete />
            </li>
          </ul>
        </article>
      )}
    </li>
  )
}

export default TodoItem

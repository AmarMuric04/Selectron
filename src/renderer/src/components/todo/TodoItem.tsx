import {
  deleteTodo,
  editTodo,
  setCompleted,
  setIsCreating,
  setIsEditing,
  setNewTodosValue,
  setUncompleted
} from '@renderer/store/todoSlice'
import React, { useState } from 'react'
import { FaEdit, FaPlay } from 'react-icons/fa'
import { MdCheckBox, MdCheckBoxOutlineBlank, MdDelete } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import AddTodo from './AddTodo'

const TodoItem: React.FC<{
  completed: boolean
  todo: string
}> = ({ completed, todo }) => {
  const [value, setValue] = useState(todo.todo)
  const dispatch = useDispatch()
  const { newTodosValue, isEditing } = useSelector((state) => state.todo)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLLIElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = e.currentTarget.nextElementSibling as HTMLElement
      if (next) next.focus()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const prev = e.currentTarget.previousElementSibling as HTMLElement
      if (prev) prev.focus()
    }
  }

  return (
    <li tabIndex={0} onKeyDown={handleKeyDown}>
      {isEditing === todo._id && (
        <AddTodo
          onSave={async () => {
            if (newTodosValue.trim()) {
              await window.api?.editTodo(todo._id, newTodosValue)
              setValue(newTodosValue)
              dispatch(editTodo({ id: todo._id, newTodo: newTodosValue }))
              dispatch(setNewTodosValue(''))
              dispatch(setIsEditing(''))
            }
          }}
          onCancel={() => {
            dispatch(setIsEditing(''))
            dispatch(setNewTodosValue(''))
          }}
        />
      )}
      {isEditing !== todo._id && (
        <article className="px-4 py-2 hover:bg-zinc-800 transition-all flex justify-between items-center">
          <div className="flex items-center gap-2">
            <button
              title={`${completed ? 'Uncomplete' : 'Complete'}`}
              className="cursor-pointer"
              aria-label={`${completed ? 'Mark this task as uncompleted.' : 'Mark this task as completed.'}`}
              onClick={async () => {
                if (completed) {
                  await window.api?.uncompleteTodo(todo._id)
                  dispatch(setUncompleted(todo._id))
                } else {
                  await window.api?.completeTodo(todo._id)
                  dispatch(setCompleted(todo._id))
                }
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
            <li className="hover:text-zinc-400 transition-all">
              <button
                title="Edit"
                aria-label="Edit this todo"
                onClick={() => {
                  dispatch(setIsEditing(todo._id))
                  dispatch(setIsCreating(false))
                  dispatch(setNewTodosValue(value))
                }}
                className="cursor-pointer"
              >
                <FaEdit size={14} />
              </button>
            </li>
            <li className="hover:text-zinc-400 transition-all">
              <button
                aria-label="Delete this todo"
                title="Delete"
                onClick={async () => {
                  await window.api?.deleteTodo(todo._id)
                  dispatch(deleteTodo(todo._id))
                }}
                className="cursor-pointer hover:text-red-400 transition-all"
              >
                <MdDelete />
              </button>
            </li>
          </ul>
        </article>
      )}
    </li>
  )
}

export default TodoItem

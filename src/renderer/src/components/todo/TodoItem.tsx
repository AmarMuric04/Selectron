import React from 'react'
import { FaEdit, FaPlay } from 'react-icons/fa'
import { MdCheckBox, MdCheckBoxOutlineBlank, MdDelete } from 'react-icons/md'

const TodoItem: React.FC<{
  completed: boolean
  text: string
}> = ({ completed, text }) => {
  return (
    <li className="px-4 py-2 hover:bg-zinc-800 transition-all flex justify-between items-center">
      <div className="flex items-center gap-2">
        <button
          className="cursor-pointer"
          onClick={() =>
            setTodos((prevTodos) => {
              let newCompleted, newUncompleted
              if (!completed) {
                newCompleted = [...prevTodos.completed, text]
                newUncompleted = prevTodos.uncompleted.filter((prev) => prev !== text)
              } else {
                newUncompleted = [...prevTodos.uncompleted, text]
                newCompleted = prevTodos.completed.filter((prev) => prev !== text)
              }

              return {
                ...prevTodos,
                completed: newCompleted,
                uncompleted: newUncompleted
              }
            })
          }
        >
          {completed ? (
            <MdCheckBox />
          ) : (
            <MdCheckBoxOutlineBlank size={18} className="hover:text-zinc-400 transition-all" />
          )}
        </button>
        <p>{text}</p>
      </div>
      <ul className="flex items-center gap-2">
        <li className="hover:text-zinc-400 transition-all cursor-pointer">
          <FaPlay size={12} />
        </li>
        <li className="hover:text-zinc-400 transition-all cursor-pointer">
          <FaEdit size={14} />
        </li>
        <li className="hover:text-zinc-400 transition-all cursor-pointer">
          <MdDelete />
        </li>
      </ul>
    </li>
  )
}

export default TodoItem

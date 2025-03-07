import React, { useState } from 'react'
import { IoMdCheckboxOutline } from 'react-icons/io'
import { RiCheckboxBlankLine } from 'react-icons/ri'
import { IoCheckboxOutline } from 'react-icons/io5'
import TodoItem from './TodoItem'
import AddTodo from './AddTodo'
import { setIsCreating } from '@renderer/store/todoSlice'
import { useDispatch, useSelector } from 'react-redux'

const Todos: React.FC = () => {
  const [showCompleted, setShowCompleted] = useState(false)

  const dispatch = useDispatch()
  const { isCreating, todos } = useSelector((state) => state.todo)

  return (
    <section className="w-1/4 min-w-[20rem] h-full bg-zinc-900 rounded-2xl flex flex-col">
      <header className="flex gap-2 items-center text-zinc-700 p-4 text-sm">
        <button
          onClick={() => setShowCompleted(false)}
          className={`px-2 py-1 rounded-md hover:bg-zinc-700/20 ${
            !showCompleted && 'bg-zinc-700/30'
          } transition-all cursor-pointer flex items-center gap-2`}
        >
          <RiCheckboxBlankLine />
          <p>Pending</p>
        </button>
        <button
          onClick={() => setShowCompleted(true)}
          className={`px-2 py-1 rounded-md hover:bg-zinc-700/20 ${
            showCompleted && 'bg-zinc-700/30'
          } transition-all cursor-pointer flex items-center gap-2`}
        >
          <IoCheckboxOutline />
          <p>Completed</p>
        </button>
      </header>

      {!showCompleted && (
        <ul className="text-zinc-500 flex flex-col gap-2 mb-4">
          {todos.uncompleted.map((t, index) => (
            <TodoItem text={t} completed={false} key={index} />
          ))}
        </ul>
      )}

      {showCompleted && todos.completed.length > 0 && (
        <ul className="text-zinc-500 flex flex-col gap-2 mb-4">
          {todos.completed.map((t, index) => (
            <TodoItem text={t} completed={true} key={index} />
          ))}
        </ul>
      )}

      {!showCompleted && !isCreating && todos.uncompleted.length > 0 && (
        <button
          onClick={() => dispatch(setIsCreating(true))}
          className="mx-4 text-zinc-700 text-sm py-1 border border-zinc-700 rounded-lg mt-4 hover:border-zinc-600 hover:text-zinc-600 transition-all cursor-pointer"
        >
          + Add new todo
        </button>
      )}

      {isCreating && <AddTodo />}

      {!isCreating && !showCompleted && todos.uncompleted.length === 0 && (
        <div className="px-4 flex-1 w-full flex items-center justify-center text-zinc-800 flex-col gap-2">
          <IoMdCheckboxOutline size={60} />
          <p className="font-semibold">You don{"'"}t have any todos</p>
          <button
            onClick={() => dispatch(setIsCreating(true))}
            className="underline text-zinc-600 hover:text-zinc-500 font-semibold transition-all cursor-pointer"
          >
            Add a new todo
          </button>
        </div>
      )}
    </section>
  )
}

export default Todos

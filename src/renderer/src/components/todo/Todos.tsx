import React, { useState } from 'react'
import { IoMdCheckboxOutline } from 'react-icons/io'
import { RiCheckboxBlankLine } from 'react-icons/ri'
import { IoCheckboxOutline } from 'react-icons/io5'

const Todos: React.FC = () => {
  const [isCreatingTodo, setIsCreatingTodo] = useState(false)
  const [todos, setTodos] = useState<string[]>(['Wash the dishes', 'Play piano'])
  const [todo, setTodo] = useState<string>('')

  return (
    <section className="w-1/4 min-w-[20rem] h-full bg-zinc-900 rounded-2xl flex flex-col px-4">
      <header className="flex gap-2 items-center text-zinc-700 py-4 text-sm">
        <button className="px-2 py-1 rounded-md hover:bg-zinc-700/20 transition-all cursor-pointer flex items-center gap-2">
          <RiCheckboxBlankLine />
          <p>Pending</p>
        </button>
        <button className="px-2 py-1 rounded-md hover:bg-zinc-700/20 transition-all cursor-pointer flex items-center gap-2">
          <IoCheckboxOutline />
          <p>Completed</p>
        </button>
      </header>
      <ul className="text-zinc-500 flex flex-col gap-2 mb-4">
        {todos.map((todo) => (
          <li key={todo}>{todo}</li>
        ))}
      </ul>
      {!isCreatingTodo && todos.length && (
        <button
          onClick={() => setIsCreatingTodo(true)}
          className="text-zinc-700 text-sm py-1 border-1 border-zinc-700 rounded-lg mt-4 hover:border-zinc-600 hover:text-zinc-600 transition-all cursor-pointer"
        >
          + Add new todo
        </button>
      )}
      {isCreatingTodo && (
        <div className="text-zinc-600 p-2 border-1 flex flex-col border-zinc-600 rounded-lg text-sm">
          <input
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            placeholder="Type something and add it to your todos"
            className="placeholder-zinc-600 outline-none text-white"
            type="text"
          />
          <div className="flex gap-2 mt-4">
            <button
              className="cursor-pointer hover:text-zinc-500 transition-all"
              onClick={() => setIsCreatingTodo(false)}
            >
              CANCEL
            </button>
            <button
              className="cursor-pointer hover:text-zinc-500 transition-all"
              onClick={() => {
                setTodos([...todos, todo])
                setTodo('')
                setIsCreatingTodo(false)
              }}
            >
              SAVE
            </button>
          </div>
        </div>
      )}
      {!isCreatingTodo && !todos.length && (
        <div className="flex-1 w-full flex items-center justify-center text-zinc-800 flex-col gap-2">
          <IoMdCheckboxOutline size={60} />
          <p className="font-semibold">You don{"'"}t have any todos</p>
          <button
            onClick={() => setIsCreatingTodo(true)}
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

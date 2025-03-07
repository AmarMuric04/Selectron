import React, { useRef, useState, useEffect } from 'react'
import { IoMdCheckboxOutline } from 'react-icons/io'
import { RiCheckboxBlankLine } from 'react-icons/ri'
import { IoCheckboxOutline } from 'react-icons/io5'
import { MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md'

const Todos: React.FC = () => {
  const [isCreatingTodo, setIsCreatingTodo] = useState(false)
  const [todos, setTodos] = useState<Todos>({
    creator: 'user123',
    uncompleted: [],
    completed: []
  })
  const [todo, setTodo] = useState<Todo>('')
  const [showCompleted, setShowCompleted] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (isCreatingTodo && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isCreatingTodo])

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
            <li className="px-4 py-2 hover:bg-zinc-800 transition-all" key={index}>
              <button className="flex gap-2 items-center">
                <button
                  className="cursor-pointer"
                  onClick={() =>
                    setTodos((prevTodos) => {
                      const newCompleted = [...prevTodos.completed, t]
                      const newUncompleted = prevTodos.uncompleted.filter((prev) => prev !== t)

                      return {
                        ...prevTodos,
                        completed: newCompleted,
                        uncompleted: newUncompleted
                      }
                    })
                  }
                >
                  <MdCheckBoxOutlineBlank
                    size={18}
                    className="hover:text-zinc-400 transition-all"
                  />
                </button>
                <p>{t}</p>
              </button>
            </li>
          ))}
        </ul>
      )}

      {showCompleted && todos.completed.length > 0 && (
        <ul className="text-zinc-500 flex flex-col gap-2 mb-4">
          {todos.completed.map((t, index) => (
            <li className="px-4 py-2 hover:bg-zinc-800 transition-all" key={index}>
              <button className="flex gap-2 items-center">
                <button
                  className="cursor-pointer"
                  onClick={() =>
                    setTodos((prevTodos) => {
                      const newUncompleted = [...prevTodos.uncompleted, t]
                      const newCompleted = prevTodos.completed.filter((prev) => prev !== t)

                      return {
                        ...prevTodos,
                        completed: newCompleted,
                        uncompleted: newUncompleted
                      }
                    })
                  }
                >
                  <MdCheckBox size={18} className="hover:text-zinc-400 transition-all" />
                </button>
                <p>{t}</p>
              </button>
            </li>
          ))}
        </ul>
      )}

      {!showCompleted && !isCreatingTodo && todos.uncompleted.length > 0 && (
        <button
          onClick={() => setIsCreatingTodo(true)}
          className="mx-4 text-zinc-700 text-sm py-1 border border-zinc-700 rounded-lg mt-4 hover:border-zinc-600 hover:text-zinc-600 transition-all cursor-pointer"
        >
          + Add new todo
        </button>
      )}

      {isCreatingTodo && (
        <div className="mx-4 text-zinc-600 p-2 border border-zinc-600 rounded-lg text-sm">
          <input
            ref={inputRef}
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            placeholder="Type something and add it to your todos"
            className="placeholder-zinc-600 outline-none text-white bg-transparent w-full"
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
                if (todo.trim()) {
                  setTodos((prev) => ({
                    ...prev,
                    uncompleted: [...prev.uncompleted, todo.trim()]
                  }))
                  setTodo('')
                  setIsCreatingTodo(false)
                }
              }}
            >
              SAVE
            </button>
          </div>
        </div>
      )}

      {!isCreatingTodo && !showCompleted && todos.uncompleted.length === 0 && (
        <div className="px-4 flex-1 w-full flex items-center justify-center text-zinc-800 flex-col gap-2">
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

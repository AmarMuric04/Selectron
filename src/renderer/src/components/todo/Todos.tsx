import React, { useEffect, useState } from 'react'
import { IoMdCheckboxOutline } from 'react-icons/io'
import { RiCheckboxBlankLine } from 'react-icons/ri'
import { IoCheckboxOutline } from 'react-icons/io5'
import TodoItem from './TodoItem'
import AddTodo from './AddTodo'
import {
  addTodo,
  setIsCreating,
  setIsEditing,
  setNewTodosValue,
  setTodos
} from '@renderer/store/todoSlice'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { FaRegHourglassHalf } from 'react-icons/fa6'
import KeyboardButton from '../button/KeyboardButton'
import { RootState } from '@renderer/store/redux'

const Todos: React.FC = () => {
  const [showCompleted, setShowCompleted] = useState(false)
  const [gettingTodos, setGettingTodos] = useState(true)

  const dispatch = useDispatch()
  const { isCreating, todos, newTodosValue, isEditing } = useSelector(
    (state: RootState) => state.todo
  )
  const { user } = useSelector((state: RootState) => state.user)

  // const notify = (text: string): void => {
  //   toast.success(text)
  // }

  useEffect(() => {
    if (showCompleted) dispatch(setIsCreating(false))
  }, [showCompleted, dispatch])

  useEffect(() => {
    if (!user) return

    const getTodos = async (): Promise<void> => {
      const response = await window.api?.getTodos()

      dispatch(setTodos(response?.data))
    }

    getTodos()
    setGettingTodos(false)
    // notify('Successfully logged in as: ' + user.username)
  }, [user, dispatch])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (isEditing || isCreating) return
      if (e.key === 'ArrowLeft') {
        setShowCompleted(false)
      } else if (e.key === 'ArrowRight') {
        setShowCompleted(true)
      } else if (e.key === 'a' || e.key === 'A') {
        console.log(isEditing)
        if (isEditing || showCompleted) return
        if (!isCreating) {
          e.preventDefault()
          dispatch(setIsCreating(true))
          dispatch(setIsEditing(''))
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return (): void => window.removeEventListener('keydown', handleKeyDown)
  }, [dispatch, isCreating, isEditing, showCompleted])

  return (
    <section className="w-1/4 min-w-[20rem] pb-8 overflow-auto h-full bg-zinc-900 rounded-2xl flex flex-col">
      <ToastContainer />
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

      {gettingTodos && (
        <FaRegHourglassHalf className="throb text-zinc-700 self-center my-auto" size={40} />
      )}
      {!gettingTodos && todos && (
        <>
          {!showCompleted && (
            <ul className="text-zinc-500 flex flex-col gap-2 mb-4">
              {todos?.uncompleted.map((t) => <TodoItem todo={t} completed={false} key={t._id} />)}
            </ul>
          )}

          {showCompleted && todos?.completed.length > 0 && (
            <ul className="text-zinc-500 flex flex-col gap-2 mb-4">
              {todos?.completed.map((t) => <TodoItem todo={t} completed={true} key={t._id} />)}
            </ul>
          )}

          {!showCompleted && !isCreating && todos?.uncompleted.length > 0 && (
            <button
              onClick={() => {
                dispatch(setIsCreating(true))
                dispatch(setIsEditing(''))
              }}
              className="mx-4 text-zinc-700 text-sm py-1 border-dashed border-1 border-zinc-700 rounded-lg mt-4 hover:border-zinc-600 hover:text-zinc-600 transition-all cursor-pointer flex items-center gap-2 justify-center"
            >
              <KeyboardButton>a / A</KeyboardButton>+ Add new todo
            </button>
          )}

          {isCreating && (
            <AddTodo
              onSave={() => {
                if (newTodosValue.trim()) {
                  window.api?.addTodo(newTodosValue)
                  dispatch(addTodo(newTodosValue.trim()))
                  dispatch(setNewTodosValue(''))
                  dispatch(setIsCreating(false))
                }
              }}
              onCancel={() => {
                dispatch(setIsCreating(false))
                dispatch(setNewTodosValue(''))
              }}
            />
          )}

          {!isCreating && !showCompleted && todos?.uncompleted.length === 0 && (
            <div className="px-4 flex-1 w-full flex items-center justify-center text-zinc-800 flex-col gap-2">
              <IoMdCheckboxOutline size={60} />
              <p className="font-semibold">You don{"'"}t have any todos</p>
              <button
                onClick={() => dispatch(setIsCreating(true))}
                className="text-zinc-600 hover:text-zinc-500 font-semibold transition-all cursor-pointer flex gap-2 items-center"
              >
                <KeyboardButton>a / A</KeyboardButton>
                <span className="underline">Add a new todo</span>
              </button>
            </div>
          )}
        </>
      )}
    </section>
  )
}

export default Todos

import Todos from '@renderer/components/todo/Todos'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaRegUserCircle } from 'react-icons/fa'
import { IoMdLogOut } from 'react-icons/io'
import { setUser } from '@renderer/store/userSlice'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

const Todo: React.FC = () => {
  const { user } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const notify = (message: string): void => {
    toast.success(message)
  }

  const handleLogOut = async (): Promise<void> => {
    navigate('/')
    await window.api?.logOut()
    dispatch(
      setUser({
        username: '',
        _id: ''
      })
    )
    notify('Successfully logged out!')
  }

  return (
    <main className="p-2 flex flex-col h-full w-screen gap-2">
      <ToastContainer />
      <header className="gap-2 text-zinc-500 font-mono font-semibold justify-end items-center w-full flex">
        <div className="bg-zinc-900 px-2 py-1 rounded-2xl flex items-center gap-2 hover:text-zinc-400 transition-all select-none">
          <FaRegUserCircle />
          <p>{user.username}</p>
        </div>
        <button
          onClick={handleLogOut}
          className="text-red-500 bg-zinc-900 h-full px-2 rounded-full hover:bg-red-500/20 hover:text-red-400 transition-all cursor-pointer"
        >
          <IoMdLogOut />
        </button>
      </header>
      <div className="flex gap-2 h-full">
        <Todos />
        <section className="flex-grow bg-zinc-900 rounded-xl"></section>
      </div>
    </main>
  )
}

export default Todo

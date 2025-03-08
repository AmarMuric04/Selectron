import Todos from '@renderer/components/todo/Todos'
import React from 'react'
import { useSelector } from 'react-redux'
import { FaRegUserCircle } from 'react-icons/fa'
import { IoMdLogOut } from 'react-icons/io'

const Todo: React.FC = () => {
  const { user } = useSelector((state) => state.user)

  return (
    <main className="p-2 flex flex-col h-full w-screen gap-2">
      <header className="gap-2 text-zinc-500 font-mono font-semibold justify-end items-center w-full flex">
        <div className="bg-zinc-900 px-2 py-1 rounded-2xl flex items-center gap-2 hover:text-zinc-400 transition-all select-none">
          <FaRegUserCircle />
          <p>{user.username}</p>
        </div>
        <button className="text-red-500 bg-zinc-900 h-full px-2 rounded-full hover:bg-red-500/20 hover:text-red-400 transition-all cursor-pointer">
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

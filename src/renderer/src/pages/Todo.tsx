import Todos from '@renderer/components/todo/Todos'
import React from 'react'

const Todo: React.FC = () => {
  return (
    <main className="p-2 flex h-full w-screen gap-2">
      <Todos />
      <section className="flex-grow bg-zinc-900 rounded-xl"></section>
    </main>
  )
}

export default Todo

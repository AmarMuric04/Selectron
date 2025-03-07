import { setNewTodosValue } from '@renderer/store/todoSlice'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const AddTodo: React.FC<{ onCancel: () => void; onSave: () => void }> = ({ onCancel, onSave }) => {
  const dispatch = useDispatch()
  const { isCreating, newTodosValue } = useSelector((state) => state.todo)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isCreating && inputRef.current) {
      inputRef.current?.focus()
    }
  }, [isCreating])

  return (
    <div className="mx-4 text-zinc-600 p-2 border border-zinc-600 rounded-lg text-sm">
      <input
        ref={inputRef}
        value={newTodosValue}
        onChange={(e) => dispatch(setNewTodosValue(e.target.value))}
        placeholder="Type something and add it to your todos"
        className="placeholder-zinc-600 outline-none text-white bg-transparent w-full"
        type="text"
      />
      <div className="flex gap-2 mt-4">
        <button className="cursor-pointer hover:text-zinc-500 transition-all" onClick={onCancel}>
          CANCEL
        </button>
        <button className="cursor-pointer hover:text-zinc-500 transition-all" onClick={onSave}>
          SAVE
        </button>
      </div>
    </div>
  )
}

export default AddTodo

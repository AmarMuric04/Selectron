import React from 'react'

const KeyboardButton: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="h-full text-zinc-600 text-xs py-0.5 group-hover:bg-zinc-700/50 transition-all px-3 bg-zinc-800 grid place-items-center rounded-lg">
      {children}
    </div>
  )
}

export default KeyboardButton

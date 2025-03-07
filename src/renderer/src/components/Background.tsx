import React from 'react'

const Background: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <main className="bg-zinc-950 min-h-screen w-screen">{children}</main>
}

export default Background

import React from 'react'

const Background: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <main className="bg-zinc-950 h-screen w-screen absolute left-0 top-0">{children}</main>
}

export default Background

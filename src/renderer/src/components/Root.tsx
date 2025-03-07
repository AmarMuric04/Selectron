import React from 'react'
import { Outlet } from 'react-router-dom'
import Background from './Background'
import Logo from '../assets/icon.png'

const Root: React.FC = () => {
  return (
    <Background>
      <header id="frame" className="bg-zinc-900 h-[5%] text-zinc-400 flex items-center gap-2 px-4">
        <img src={Logo} className="h-1/2" />
        <h1 className="font-mono font-semibold">Selectron</h1>
      </header>
      <div className="flex h-[95%]">
        <Outlet />
      </div>
    </Background>
  )
}

export default Root

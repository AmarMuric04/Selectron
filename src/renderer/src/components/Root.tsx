import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Background from './Background'
import Logo from '../assets/icon.png'
import { FaRegWindowMaximize, FaRegWindowMinimize, FaRegWindowClose } from 'react-icons/fa'
import { FadeLoader } from 'react-spinners'

const Root: React.FC = () => {
  const [checkingStatus, setCheckingStatus] = useState(true)
  const navigate = useNavigate()

  const handleMinimize = () => {
    window.electron?.send('window-minimize')
  }

  const handleMaximize = () => {
    window.electron?.send('window-maximize')
  }

  const handleClose = () => {
    window.electron?.send('window-close')
  }

  useEffect(() => {
    const handleAutoSignIn = async (): Promise<User | null> => {
      await window.api.autoSignIn()
    }

    const user = handleAutoSignIn()

    if (user) navigate('/todos')
    else navigate('/')
    setCheckingStatus(false)
  }, [navigate])

  return (
    <Background>
      <header
        id="frame"
        className="bg-zinc-900 rounded-b-3xl relative z-50 h-[5%] text-zinc-400 flex items-center justify-between px-4"
      >
        <div className="flex items-center gap-2 h-full">
          <img src={Logo} className="h-1/2" />
          <h1 className="font-mono font-semibold">Selectron</h1>
          <p className="text-sm">v1.0</p>
        </div>
        <ul className="flex items-center gap-2 h-full text-zinc-600">
          <li className="hover:text-zinc-300 transition-all cursor-pointer">
            <button onClick={handleMinimize}>
              <FaRegWindowMinimize />
            </button>
          </li>
          <li className="hover:text-zinc-300 transition-all cursor-pointer">
            <button onClick={handleMaximize}>
              <FaRegWindowMaximize />
            </button>
          </li>
          <li className="hover:text-zinc-300 transition-all cursor-pointer">
            <button onClick={handleClose}>
              <FaRegWindowClose />
            </button>
          </li>
        </ul>
      </header>
      <div className="flex h-[95%]">
        {checkingStatus && <FadeLoader />}
        {!checkingStatus && <Outlet />}
      </div>
    </Background>
  )
}

export default Root

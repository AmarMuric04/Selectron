import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Background from './Background'
import Logo from '../assets/icon.png'
import { FaRegWindowMaximize, FaRegWindowMinimize, FaRegWindowClose } from 'react-icons/fa'
import { FadeLoader } from 'react-spinners'
import { setUser } from '@renderer/store/userSlice'
import { useDispatch } from 'react-redux'

const Root: React.FC = () => {
  const [checkingStatus, setCheckingStatus] = useState(true)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleMinimize = () => {
    window.electron?.frameInteraction('minimize')
  }

  const handleMaximize = () => {
    console.log('maximizing...')
    window.electron?.frameInteraction('maximize')
  }

  const handleClose = () => {
    window.electron?.frameInteraction('close')
  }

  useEffect(() => {
    console.log('Calling funciton...')
    let user
    const handleAutoSignIn = async (): Promise<void> => {
      user = await window.api.autoSignIn()

      if (user) {
        dispatch(setUser(user))
        navigate('/todos')
      } else {
        navigate('/')
      }

      setCheckingStatus(false)
    }

    handleAutoSignIn()
  }, [navigate, dispatch])

  return (
    <Background>
      <header
        id="frame"
        className="mx-2 bg-zinc-900 rounded-2xl relative z-50 h-[5%] text-zinc-400 flex items-center justify-between px-4"
      >
        <div className="flex items-center gap-2 h-full">
          <img src={Logo} className="h-1/2" />
          <h1 className="font-mono font-semibold">Selectron</h1>
          <p className="text-sm">v1.0</p>
        </div>
        <ul className="flex items-center gap-2 h-full text-zinc-600 relative z-50">
          <li className="hover:text-yellow-500 transition-all">
            <button className="cursor-pointer" onClick={handleMinimize}>
              <FaRegWindowMinimize />
            </button>
          </li>
          <li className="hover:text-lime-500 transition-all">
            <button className="cursor-pointer" onClick={handleMaximize}>
              <FaRegWindowMaximize />
            </button>
          </li>
          <li className="hover:text-red-500 transition-all">
            <button className="cursor-pointer" onClick={handleClose}>
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

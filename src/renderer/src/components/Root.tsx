import React from 'react'
import { Outlet } from 'react-router-dom'
import Background from './Background'

const Root: React.FC = () => {
  return (
    <Background>
      <Outlet />
    </Background>
  )
}

export default Root

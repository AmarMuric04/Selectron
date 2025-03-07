import React from 'react'
import Navbar from './nav/Navbar'
import { Outlet, useLocation } from 'react-router-dom'
import Background from './Background'

const Root: React.FC = () => {
  const location = useLocation()
  const hideNavbar = ['/login', '/signup'].includes(location.pathname)

  return (
    <Background>
      {!hideNavbar && <Navbar />}
      <Outlet />
    </Background>
  )
}

export default Root

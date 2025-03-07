import { Drawer, IconButton, List, ListItem, Toolbar, useMediaQuery, useTheme } from '@mui/material'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FaHamburger } from 'react-icons/fa'
import AnimatedButton from '../AnimatedButton'

const Navbar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const toggleDrawer = (open: boolean): void => {
    setDrawerOpen(open)
  }

  const menuItems = (
    <>
      <NavLink to="/login">
        <p className="hover:text-purple-400 transition-all">Log In</p>
      </NavLink>
      <NavLink to="/signup">
        <AnimatedButton>Sign Up</AnimatedButton>
      </NavLink>
    </>
  )

  return (
    <>
      <nav className="bg-zinc-800 text-white px-4">
        <Toolbar>
          <h1 className="flex-grow font-mono text-lg font-semibold">Selectron</h1>
          {isMobile ? (
            <>
              <IconButton color="inherit" onClick={() => toggleDrawer(true)}>
                <FaHamburger />
              </IconButton>
              <Drawer anchor="right" open={drawerOpen} onClick={() => toggleDrawer(false)}>
                <List>
                  <ListItem className="flex flex-col gap-2">{menuItems}</ListItem>
                </List>
              </Drawer>
            </>
          ) : (
            <div className="flex gap-2 items-center">{menuItems}</div>
          )}
        </Toolbar>
      </nav>
    </>
  )
}

export default Navbar

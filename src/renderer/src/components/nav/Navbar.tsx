import {
  AppBar,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FaHamburger } from 'react-icons/fa'

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
        <Button
          sx={{
            paddingX: '2rem'
          }}
          color="inherit"
        >
          <Typography>Log In</Typography>
        </Button>
      </NavLink>
      <NavLink to="/signup">
        <Button
          sx={{
            paddingX: '2rem'
          }}
          color="inherit"
        >
          <Typography>Sign Up</Typography>
        </Button>
      </NavLink>
    </>
  )

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Electron Todo
          </Typography>
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
            menuItems
          )}
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Navbar

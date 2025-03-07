import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField'
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput
} from '@mui/material'
import { NavLink } from 'react-router-dom'
import Logo from '@renderer/assets/icon.png'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { BeatLoader } from 'react-spinners'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const USER_INFO = { username: '', email: '', password: '' }

const AuthForm: React.FC<{ type: string }> = ({ type }) => {
  const [userInfo, setUserInfo] = useState<User>(USER_INFO)
  const [loading, setLoading] = useState(false)

  const [showPassword, setShowPassword] = React.useState(false)

  const handleClickShowPassword = (): void => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault()
  }

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault()
  }

  useEffect(() => {
    setUserInfo(USER_INFO)
  }, [type])

  const handleAddUser = async (): Promise<AddUserType | null> => {
    const userData: User = userInfo

    try {
      setLoading(true)
      const response = await window.api.addUser(userData)
      console.log(response)

      setUserInfo(USER_INFO)
      notify()

      return response
    } catch (error) {
      console.error('Unexpected error:', error)
      return null
    } finally {
      setLoading(false)
    }
  }

  const isLoggingIn = type === 'login'

  const title = isLoggingIn ? 'Log In' : 'Sign Up'

  const notify = (): void => {
    toast.success('Signed up successfully!')
  }

  return (
    <form className="bg-zinc-800 text-white p-8 rounded-lg shadow-lg flex flex-col gap-2 w-96 min-h-96">
      <ToastContainer />
      <div className="flex items-center gap-2 self-center">
        <img className="w-8 h-8" src={Logo} alt="A display of an electron" />
        <p className="font-semibold font-mono">
          <span className="text-zinc-400">Select</span>ron
        </p>
      </div>
      <div className="flex items-center flex-col text-center my-4">
        <h1 className="font-serif text-3xl">{isLoggingIn ? 'Welcome Back' : 'Hello There'}</h1>
        <p className="text-sm text-gray-300">
          {isLoggingIn
            ? 'Enter your email and password to your account'
            : 'Create an account for free'}
        </p>
      </div>
      <TextField
        value={userInfo.email}
        onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
        id="outlined-basic"
        label="Email"
        variant="outlined"
        type="email"
        sx={{
          input: { color: 'white' },
          '& label': { color: 'white' },
          // Override the label color when focused
          '& label.Mui-focused': { color: 'white' },
          // Override the border colors in various states
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'white'
            },
            '&:hover fieldset': {
              borderColor: 'white'
            },
            '&.Mui-focused fieldset': {
              borderColor: 'white'
            }
          }
        }}
      />

      <TextField
        value={userInfo.username}
        onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value })}
        id="outlined-basic"
        label="Username"
        variant="outlined"
        type="text"
        sx={{
          input: { color: 'white' },
          '& label': { color: 'white' },
          '& label.Mui-focused': { color: 'white' },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'white'
            },
            '&:hover fieldset': {
              borderColor: 'white'
            },
            '&.Mui-focused fieldset': {
              borderColor: 'white'
            }
          }
        }}
      />

      <FormControl
        variant="outlined"
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'white'
            },
            '&:hover fieldset': {
              borderColor: 'white'
            },
            '&.Mui-focused fieldset': {
              borderColor: 'white'
            }
          }
        }}
      >
        <InputLabel
          htmlFor="outlined-adornment-password"
          sx={{ color: 'white', '&.Mui-focused': { color: 'white' } }}
        >
          Password
        </InputLabel>
        <OutlinedInput
          onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
          id="outlined-adornment-password"
          type={showPassword ? 'text' : 'password'}
          label="Password"
          sx={{
            input: { color: 'white' }
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label={showPassword ? 'hide the password' : 'display the password'}
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                onMouseUp={handleMouseUpPassword}
                edge="end"
                sx={{ color: 'white' }} // icon color white
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      <Button
        disabled={loading}
        sx={{
          textTransform: 'none',
          height: '50px',
          backgroundColor: '#000',
          borderRadius: '5px'
        }}
        onClick={handleAddUser}
        variant="contained"
      >
        {loading ? <BeatLoader color="white" size={5} /> : title}
      </Button>
      <p className="text-sm text-center">
        {isLoggingIn ? (
          <>
            Don{"'"}t have an account?{' '}
            <NavLink
              className="font-semibold hover:underline transition-all cursor-pointer"
              to="/signup"
            >
              Create one!
            </NavLink>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <NavLink
              className="font-semibold hover:underline transition-all cursor-pointer"
              to="/login"
            >
              Log in now!
            </NavLink>
          </>
        )}
      </p>
    </form>
  )
}

export default AuthForm

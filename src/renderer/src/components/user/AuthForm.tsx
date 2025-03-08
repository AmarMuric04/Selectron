import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField'
import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput
} from '@mui/material'
import { NavLink, useNavigate } from 'react-router-dom'
import Logo from '@renderer/assets/icon.png'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { BeatLoader } from 'react-spinners'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { setUser } from '@renderer/store/userSlice'
import { useDispatch } from 'react-redux'

const USER_INFO = { username: '', email: '', password: '' }

const AuthForm: React.FC<{ type: string }> = ({ type }) => {
  const [userInfo, setUserInfo] = useState<User>(USER_INFO)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any>([])

  const navigate = useNavigate()
  const dispatch = useDispatch()

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
    setError([])
    setLoading(false)
  }, [type])

  const handleAddUser = async (): Promise<void> => {
    setLoading(true)
    let response
    if (type === 'signup') response = await window.api.signUp(userInfo)
    else if (type === 'login')
      response = await window.api.logIn({ email: userInfo.email, password: userInfo.password })

    if (response.success) {
      setUserInfo(USER_INFO)
      notify(response.success, response.message)
      dispatch(setUser(response.data.user))
      navigate('/todos')
    }
    if (!response.success) {
      setError(response.data)
      notify(response.success, response.data)
    }

    setLoading(false)
  }

  const isLoggingIn = type === 'login'

  const title = isLoggingIn ? 'Log In' : 'Sign Up'

  const notify = (success: boolean, message: any): void => {
    if (success) toast.success(message)
    else
      message.forEach((err) => {
        toast.error(err.msg)
      })
  }

  return (
    <form className="bg-zinc-800 text-white p-8 rounded-lg shadow-lg flex flex-col gap-2 w-96 min-h-96">
      <ToastContainer />
      <div className="flex items-center gap-2 self-center">
        <img className="w-8 h-8" src={Logo} alt="A display of an electron" />
        <p className="font-semibold font-mono">
          <span className="text-zinc-500">Select</span>
          <span className="text-zinc-400">ron</span>
        </p>
      </div>
      <div className="flex items-center flex-col text-center my-4">
        <h1 className="font-serif text-3xl">{isLoggingIn ? 'Welcome Back!' : 'Hello There!'}</h1>
        <p className="text-sm text-gray-300">
          {isLoggingIn
            ? 'Enter your email and password to your account'
            : 'Create an account and start your journey!'}
        </p>
      </div>
      <TextField
        value={userInfo.email}
        onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
        id="outlined-basic"
        label="Email"
        variant="outlined"
        type="email"
        onFocus={() => setError([])}
        error={error.some((err) => err?.path === 'email')}
        helperText={error.find((err) => err?.path === 'email')?.msg}
        sx={{
          input: { color: 'white' },
          '& label': { color: '#3f3f46' },
          '& label.Mui-focused': { color: '#3f3f46' },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#3f3f46'
            },
            '&:hover fieldset': {
              borderColor: '#3f3f46'
            },
            '&.Mui-focused fieldset': {
              borderColor: '#3f3f46'
            }
          }
        }}
      />

      {type === 'signup' && (
        <TextField
          value={userInfo.username}
          onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value })}
          id="outlined-basic"
          label="Username"
          variant="outlined"
          type="text"
          onFocus={() => setError([])}
          error={error.some((err) => err?.path === 'username')}
          helperText={error.find((err) => err?.path === 'username')?.msg}
          sx={{
            input: { color: 'white' },
            '& label': { color: '#3f3f46' },
            '& label.Mui-focused': { color: '#3f3f46' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#3f3f46'
              },
              '&:hover fieldset': {
                borderColor: '#3f3f46'
              },
              '&.Mui-focused fieldset': {
                borderColor: '#3f3f46'
              }
            }
          }}
        />
      )}

      <FormControl
        variant="outlined"
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#3f3f46'
            },
            '&:hover fieldset': {
              borderColor: '#3f3f46'
            },
            '&.Mui-focused fieldset': {
              borderColor: '#3f3f46'
            }
          }
        }}
      >
        <InputLabel
          htmlFor="outlined-adornment-password"
          sx={{ color: '#3f3f46', '&.Mui-focused': { color: '#3f3f46' } }}
        >
          Password
        </InputLabel>
        <OutlinedInput
          value={userInfo.password}
          onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
          id="outlined-adornment-password"
          type={showPassword ? 'text' : 'password'}
          error={error.some((err) => err?.path === 'password')}
          label="Password"
          onFocus={() => setError([])}
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
                sx={{ color: 'white' }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        <FormHelperText error={error.some((err) => err?.path === 'password')}>
          {error.find((err) => err?.path === 'password')?.msg}
        </FormHelperText>
      </FormControl>

      <Button
        disabled={loading}
        sx={{
          textTransform: 'none',
          height: '50px',
          bgcolor: '#3f3f46',
          borderRadius: '5px'
        }}
        onClick={handleAddUser}
        variant="contained"
        color="secondary"
      >
        {loading ? <BeatLoader color="white" size={5} /> : title}
      </Button>
      <p className="text-sm text-center">
        {isLoggingIn ? (
          <>
            Don{"'"}t have an account?{' '}
            <NavLink
              className="font-semibold hover:underline transition-all cursor-pointer text-zinc-400 hover:text-zinc-500"
              to="/"
            >
              Create one!
            </NavLink>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <NavLink
              className="font-semibold hover:underline transition-all cursor-pointer text-zinc-400 hover:text-zinc-500"
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

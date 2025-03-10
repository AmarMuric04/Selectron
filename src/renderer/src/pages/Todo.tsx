import Todos from '@renderer/components/todo/Todos'
import { useDispatch, useSelector } from 'react-redux'
import { FaRegUserCircle } from 'react-icons/fa'
import { IoMdLogOut } from 'react-icons/io'
import { setUser } from '@renderer/store/userSlice'
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useEffect } from 'react'
import { SlSettings } from 'react-icons/sl'
import KeyboardButton from '@renderer/components/button/KeyboardButton'
import { BsArrowRight } from 'react-icons/bs'
import { BsArrowLeft } from 'react-icons/bs'
import { RootState } from '@renderer/store/redux'

const Todo: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // const notify = (message: string): void => {
  //   toast.success(message)
  // }

  useEffect(() => {
    if (!user._id) navigate('/')
  }, [user, navigate])

  const handleLogOut = async (): Promise<void> => {
    await window.api?.logOut()
    dispatch(
      setUser({
        username: '',
        _id: ''
      })
    )
    // notify('Successfully logged out!')
  }

  return (
    <main className="p-2 pt-0 flex flex-col h-full w-screen gap-2">
      <ToastContainer />
      <header className="gap-2 text-zinc-500 font-mono font-semibold justify-end items-center w-full flex">
        <button
          onClick={handleLogOut}
          className="bg-zinc-900 flex items-center gap-2 hover:text-zinc-400 h-full px-2 rounded-full transition-all cursor-pointer"
        >
          <SlSettings />
        </button>
        <div className="bg-zinc-900 px-2 py-1 rounded-2xl flex items-center gap-2 hover:text-zinc-400 transition-all select-none">
          <FaRegUserCircle />
          <p>{user.username}</p>
        </div>
        <button
          onClick={handleLogOut}
          className="text-red-500 bg-zinc-900 h-full px-2 rounded-full hover:bg-red-500/20 hover:text-red-400 transition-all cursor-pointer"
        >
          <IoMdLogOut />
        </button>
      </header>
      <div className="flex gap-2 h-full max-h-[87.5%]">
        <Todos />
        <section className="flex-grow bg-zinc-900 rounded-xl"></section>
      </div>
      <footer className="text-zinc-500 flex gap-2 text-sm">
        <div className="flex gap-2 items-center">
          <KeyboardButton>
            <BsArrowLeft />
          </KeyboardButton>
          <p className="text-xs py-1">Pending</p>
        </div>
        <div className="flex gap-2 items-center">
          <KeyboardButton>
            <BsArrowRight />
          </KeyboardButton>
          <p className="text-xs py-1">Completed</p>
        </div>
        <div className="flex gap-2 items-center">
          <KeyboardButton>TAB</KeyboardButton>
          <p className="text-xs py-1">Focus Todo</p>
        </div>
        <div className="flex gap-2 items-center">
          <KeyboardButton>e</KeyboardButton>
          <p className="text-xs py-1">Edit (focused)</p>
        </div>
        <div className="flex gap-2 items-center">
          <KeyboardButton>d</KeyboardButton>
          <p className="text-xs py-1">Delete (focused)</p>
        </div>
        <div className="flex gap-2 items-center">
          <KeyboardButton>ENTER</KeyboardButton>
          <p className="text-xs py-1">Complete (focused)</p>
        </div>
      </footer>
    </main>
  )
}

export default Todo

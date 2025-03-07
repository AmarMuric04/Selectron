import { createBrowserRouter } from 'react-router-dom'
import Root from './components/Root'
import Auth from './pages/Auth'
import Todo from './pages/Todo'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/todos',
        element: <Todo />
      },
      {
        path: '/',
        index: true,
        element: <Auth type="login" />
      },
      {
        path: '/signup',
        element: <Auth type="signup" />
      }
    ]
  }
])

export default router

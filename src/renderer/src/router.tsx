import { createBrowserRouter } from 'react-router-dom'
import Root from './components/Root'
import Auth from './pages/Auth'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />, // Root wraps the app
    children: [
      {
        path: 'login',
        element: <Auth type="login" />
      },
      {
        path: 'signup',
        element: <Auth type="signup" />
      }
    ]
  }
])

export default router

import { createBrowserRouter } from 'react-router-dom'
import { HomePage } from './pages/home'
import { AppLayout } from './_layout/app-layout'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
    ],
  },
])

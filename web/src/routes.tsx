import { createBrowserRouter } from 'react-router-dom'
import { HomePage } from './pages/home'
import { AppLayout } from './_layout/app-layout'
import { OrderPage } from './pages/order'
import SuccessPurchasePage from './pages/success-purchase'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: 'orders/:itemId/:type',
        element: <OrderPage />,
      },
      {
        path: 'orders/:orderId/success',
        element: <SuccessPurchasePage />,
      },
    ],
  },
])

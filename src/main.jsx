import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Home from './routes/home'
import Delete from './routes/Checkout'
import Update from './routes/Account'
import Create from './routes/Item'

const myShoopingCart = {};
export default myShoopingCart;


const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/Checkout",
        element: <Checkout />
    },
    {
        path: "/Item",
        element: <Item />
    },
    {
        path: "/Account",
        element: <Acount />
    },
    {
        path: "/Sign In",
        element: <SignIn />
    },
    
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)


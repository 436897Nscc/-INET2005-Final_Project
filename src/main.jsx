import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Home from './routes/Home'
import Delete from './routes/Delete'
import Update from './routes/Update'
import Create from './routes/Create'


const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/Delete",
        element: <Delete />
    },
    {
        path: "/Create",
        element: <Create />
    },
    {
        path: "/Update",
        element: <Update />
    },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)


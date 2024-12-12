import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Home from './routes/Home';
import Signup from './routes/Signup';
import Login from './routes/Login';
import Logout from './routes/Logout';
import Item from './routes/Item';
import Cart from './routes/Cart';
const itemId = 0;
export default itemId;

const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/signup",
      element: <Signup />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/logout",
      element: <Logout />
    },
    {
      path: "/item/:itemId",
      element: <Item />
    },
    {
      path: "/cart",
      element: <Cart />
    },
  ]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)


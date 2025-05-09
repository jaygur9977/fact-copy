import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'
import Home from './component/Home';
import Dashboard from './component/Dashboard';
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import Factory from './component/Factory';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />, 
  },
  {
    path: "/dashboard",
    element: <Dashboard />, 
  },

   {
    path: "/factory",
    element: <Factory />, 
  },

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar> </Navbar>
  
    <RouterProvider router={router} />
  </StrictMode>,
)

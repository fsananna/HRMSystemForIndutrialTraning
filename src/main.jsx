import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// Import Pages
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Employees from './components/Employees/Employees';
import Attendance from './components/Attendance/Attendance';
import Payroll from './components/Payroll/Payroll';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  },
  {
    path: '/employees',
    element: <Employees />
  },
  {
    path: '/attendance',
    element: <Attendance />
  },
  {
    path: '/payroll',
    element: <Payroll />
  }
])

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
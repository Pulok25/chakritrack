import { createBrowserRouter, Navigate } from 'react-router';

import MainLayout from '../layouts/MainLayout';
import ProtectedRoute from '../components/ProtectedRoute';

import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';

const router = createBrowserRouter([
  // Public routes (no layout, no navbar)
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },

  // Protected routes (wrapped in MainLayout with Navbar)
  {
    path: '/',
    element: (
        <ProtectedRoute>
            <MainLayout />
        </ProtectedRoute>
        
      
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
    ],
  },

  // Catch-all redirect
  {
    path: '*',
    element: <Navigate to="/dashboard" replace />,
  },
]);

export default router;
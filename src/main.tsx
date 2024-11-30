import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Index from './pages/Index';
import Marathons from './pages/Marathons';
import MarathonRegistration from './pages/MarathonRegistration';
import Notification from './pages/Notification';
import NotFound from './pages/NotFound';
import ProtectedRoute from './pages/ProtectedRoute';
import Login from './pages/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, path: '/', element: <Index /> },
      { path: '/marathons', element: <Marathons /> },
      { path: '/marathons/new', element: <ProtectedRoute><MarathonRegistration /></ProtectedRoute> },
      { path: '/notification', element: <ProtectedRoute><Notification /></ProtectedRoute> },
      { path: '/login', element: <Login /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
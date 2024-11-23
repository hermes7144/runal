import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Index from './pages/Index';
import Marathons from './pages/Marathons';
import MarathonRegistration from './pages/MarathonRegistration';
import Notification from './pages/Notification';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, path: '/', element: <Index /> },
      { path: '/marathons', element: <Marathons /> },
      { path: '/marathons/regist', element: <MarathonRegistration /> },
      { path: '/notification', element: <Notification /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Races from './pages/Races';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, path: '/', element: <Races /> },
      { path: '/races', element: <Races /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

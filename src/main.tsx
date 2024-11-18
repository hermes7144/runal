import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Index from './pages/Index';
import Races from './pages/Races';
import RaceRegistrationForm from './pages/RaceRegistrationForm';
import * as serviceWorkerRegistration from './serviceWorkerRegistration'; // Import service worker registration

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, path: '/', element: <Index /> },
      { path: '/races', element: <Races /> },
      { path: '/races/regist', element: <RaceRegistrationForm /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// Register the service worker
serviceWorkerRegistration.register();
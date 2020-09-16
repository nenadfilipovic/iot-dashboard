import React from 'react';
import { Navigate } from 'react-router-dom';

import { Home } from '../pages/Home';
import { DeviceList } from '../pages/DeviceList';
import { Login } from '../pages/Login';
import { Profile } from '../pages/Profile';
import { Register } from '../pages/Register';
import { Device } from '../pages/Device';
import { Dashboard } from '../layouts/Dashboard';

const routes = [
  {
    path: '/',
    element: <Dashboard />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '404', element: 'not found' },
      { path: '/', element: <Navigate to="/app/home" /> },
      { path: '*', element: <Navigate to="/404" /> },
    ],
  },
  {
    path: 'app',
    element: <Dashboard />,
    children: [
      { path: '/home', element: <Home /> },
      { path: '/devices', element: <DeviceList /> },
      { path: '/profile', element: <Profile /> },
      { path: '*', element: <Navigate to="/404" /> },
    ],
  },
  {
    path: 'app/devices',
    element: <Dashboard />,
    children: [
      { path: '/:id', element: <Device /> },
      { path: '*', element: <Navigate to="/404" /> },
    ],
  },
];

export { routes };

import React from 'react';
import { Navigate } from 'react-router-dom';

import { DeviceList } from '../pages/DeviceList';
import { Login } from '../pages/Login';
import { Profile } from '../pages/Profile';
import { Register } from '../pages/Register';
import { SingleDevice } from '../pages/SingleDevice';
import { Dashboard } from '../layouts/Dashboard';
import { Basic } from '../layouts/Basic';
import { NotFound } from '../pages/NotFound';

const routes = [
  {
    path: '/',
    element: <Basic />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="/app/devices" /> },
      { path: '*', element: <Navigate to="/404" /> },
    ],
  },
  {
    path: 'app',
    element: <Dashboard />,
    children: [
      { path: '/devices', element: <DeviceList /> },
      { path: '/profile', element: <Profile /> },
      { path: '*', element: <Navigate to="/404" /> },
    ],
  },
  {
    path: 'app/devices',
    element: <Dashboard />,
    children: [
      { path: '/:id', element: <SingleDevice /> },
      { path: '*', element: <Navigate to="/404" /> },
    ],
  },
];

export { routes };

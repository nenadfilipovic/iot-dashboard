import React from 'react';
import { Navigate, Route, Routes, BrowserRouter } from 'react-router-dom';

import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { NotFound } from '../pages/NotFound';
import { DeviceList } from '../pages/DeviceList';
import { SingleDevice } from '../pages/SingleDevice';
import { Profile } from '../pages/Profile';
import { Dashboard } from '../layouts/Dashboard';
import { Basic } from '../layouts/Basic';
import { PublicRoute } from '../components/PublicRoute';
import { PrivateRoute } from '../components/PrivateRoute';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <PrivateRoute element={<Dashboard />}>
          <Route path="/" element={<Home />} />
          <Route path="devices">
            <Route path="/" element={<DeviceList />} />
            <Route path=":id" element={<SingleDevice />} />
          </Route>
          <Route path="profile" element={<Profile />} />
          <Route path="404" element={<NotFound />} />
        </PrivateRoute>
        <PublicRoute isRestricted={true} element={<Basic />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </PublicRoute>
        <Route path="*" element={<Navigate to="404" />} />
      </Routes>
    </BrowserRouter>
  );
};

export { Router };

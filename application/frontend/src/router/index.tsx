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
import { ProtectedRoute } from '../components/ProtectedRoute';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Basic />}>
          <Route path="/" element={<Navigate to="home" />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="404" />} />
        </Route>
        <ProtectedRoute path="/" element={<Dashboard />}>
          <Route path="home" element={<Home />} />
          <Route path="devices">
            <Route path="/" element={<DeviceList />} />
            <Route path=":id" element={<SingleDevice />} />
          </Route>
          <Route path="profile" element={<Profile />} />
        </ProtectedRoute>
      </Routes>
    </BrowserRouter>
  );
};

export { Router };

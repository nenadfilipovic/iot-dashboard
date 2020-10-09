import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Navigate } from 'react-router-dom';

import { RootState } from '../types';

interface RouteProps {
  element: JSX.Element;
  children?: React.ReactNode;
}

const PrivateRoute = ({ element, children, ...rest }: RouteProps) => {
  const isLoggedIn = useSelector((state: RootState) => state.userReducer.user);

  //const isLoggedIn = true;
  const route = !isLoggedIn ? (
    <Navigate to="/login" />
  ) : (
    <Route element={element} {...rest}>
      {children}
    </Route>
  );

  return route;
};

export { PrivateRoute };

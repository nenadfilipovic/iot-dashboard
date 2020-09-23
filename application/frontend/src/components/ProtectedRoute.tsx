import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../types/StateTypes';

interface ProtectedRouteProps {
  element: JSX.Element;
  children?: React.ReactNode;
  path: string;
}

const ProtectedRoute = ({
  element,
  children,
  path,

  ...rest
}: ProtectedRouteProps) => {
  const authState = (state: RootState) => state.authReducer.isLoggedIn;

  const isLoggedIn = useSelector(authState);

  const routeGuard = !isLoggedIn ? (
    <Navigate to="/login" />
  ) : (
    <Route element={element} path={path} {...rest}>
      {children}
    </Route>
  );

  return routeGuard;
};

export { ProtectedRoute };

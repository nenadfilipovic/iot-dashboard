import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Navigate } from 'react-router-dom';

import { RootState } from '../types';

interface RouteProps {
  element: JSX.Element;
  isRestricted: boolean;
  children?: React.ReactNode;
}

const PublicRoute = ({
  element,
  isRestricted,
  children,
  ...rest
}: RouteProps) => {
  const isLoggedIn = useSelector((state: RootState) => state.userReducer.user);

  const route =
    isLoggedIn && isRestricted ? (
      <Navigate to="/" />
    ) : (
      <Route element={element} {...rest}>
        {children}
      </Route>
    );

  return route;
};

export { PublicRoute };

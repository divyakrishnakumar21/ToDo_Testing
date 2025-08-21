import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  user: { name: string; email: string } | null;
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ user, children }) => {
  if (!user || !user.email) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

export default PrivateRoute;

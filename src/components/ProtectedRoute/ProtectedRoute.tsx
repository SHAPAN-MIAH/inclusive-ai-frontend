import React, { PropsWithChildren } from 'react';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../store';
import { Navigate, useLocation } from "react-router-dom";

type ProtectedRouteProps = PropsWithChildren

const ProtectedRoute = ({children }: ProtectedRouteProps) => {
  // const currentUser = useSelector((state: RootState) => state.user.currentUser);


  const location = useLocation();
  // const {isAuthenticated} = useSelector((state) => state.user);
  const token = localStorage.getItem("token");
  

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;





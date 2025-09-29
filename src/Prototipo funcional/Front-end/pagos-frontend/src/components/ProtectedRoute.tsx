import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

interface ProtectedRouteProps {
  children: ReactNode; // permite más de un nodo (div, fragmentos, etc.)
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>; // envolvemos en fragmento para evitar errores
};

export default ProtectedRoute;

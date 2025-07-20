import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { ReactNode } from "react";

type PrivateRouteType = {
  children: ReactNode;
};

const AuthGuard = ({ children }: PrivateRouteType) => {
  const { user } = useAuth();
  return user.email ? children : <Navigate to="/login" />;
};

export default AuthGuard;

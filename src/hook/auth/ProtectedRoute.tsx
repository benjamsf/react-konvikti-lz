import { Navigate } from "react-router-dom";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useKindeAuth();

  if (process.env.NODE_ENV === "development") {
    // Bypass authentication in development
    return <>{children}</>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

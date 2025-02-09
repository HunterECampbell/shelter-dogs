import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../stores/auth";
import { RouteOptions } from "../globalTypes";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to={RouteOptions.Login} replace />;
  }

  // Render the child routes if authenticated
  return <Outlet />;
};

export default ProtectedRoute;

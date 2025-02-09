import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../stores/auth";
import { RouteOptions } from "../globalTypes";

const PublicRoute = () => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to={RouteOptions.AvailableDogs} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;

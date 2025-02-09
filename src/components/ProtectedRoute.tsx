import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../stores/auth";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuthStore();

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;

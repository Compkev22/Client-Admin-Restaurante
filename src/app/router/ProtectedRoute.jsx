import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../features/auth/store/authStore.js";


export const ProtectedRoute = () => {
  const token = useAuthStore((state) => state.token);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);

  if (!token || !isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (user?.role !== "PLATFORM_ADMIN") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
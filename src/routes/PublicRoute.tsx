import { persistUserId } from "@/config/constants";
import { Navigate } from "react-router-dom";

interface PublicRouteProps {
  children: React.ReactNode;
}

export function PublicRoute({ children }: PublicRouteProps) {
  const authUser = sessionStorage.getItem(persistUserId) as string;

  if (authUser || authUser != "" || authUser != null) {
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
}

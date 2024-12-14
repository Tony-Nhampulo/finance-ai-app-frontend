import { Navigate } from "react-router-dom";
import { persistUserId } from "@/config/constants";

interface PrivateRouteProps {
  children: React.ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const authUser = sessionStorage.getItem(persistUserId) as string;

  if (!authUser || authUser == "" || authUser === null) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}

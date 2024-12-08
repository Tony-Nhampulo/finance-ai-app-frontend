import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
//import { namePersistAuth } from "../config/constants";

interface PrivateRouteProps {
  children: React.ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  /*const authUser =
    JSON.parse(sessionStorage.getItem(namePersistAuth) as string) || {};

  if (!authUser?.token) {
    return <Navigate to="/login" />;
  }*/

  const { isSignedIn } = useUser();

  if (!isSignedIn || isSignedIn == null) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}

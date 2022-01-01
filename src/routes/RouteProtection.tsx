import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { UserPage } from "../pages/UserProfile";

export function RouteProtection() {
  const { user } = useAuth();

  return(
    user ? <UserPage /> : <Navigate to="/" />
  );
}
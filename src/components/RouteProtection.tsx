import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"
import { UserProfile } from "../pages/UserProfile";

export function RouteProtection() {
  const { user } = useAuth();

  return(
    !user ? <Navigate to="/" /> : <UserProfile />
  )
}
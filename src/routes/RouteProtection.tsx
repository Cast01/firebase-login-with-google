import { useAuth } from "../hooks/useAuth";
import { UserProfile } from "../pages/UserProfile";
import { Navigate } from "react-router-dom";

export function RouteProtection() {
  const { user } = useAuth()

  return(
    !user ? <Navigate to="/login" /> : <UserProfile />
  )
}
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"
import { UserProfile } from "../pages/UserProfile";

export const RouteProtection = () => {
  const { user } = useAuth();

  return !user ? <Navigate to="/" /> : <UserProfile />
}
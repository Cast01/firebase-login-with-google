import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { LoginPage } from "./pages/LoginPage";
// import { UserProfile } from "./pages/UserProfile";
import { RouteProtection } from "./components/RouteProtection";

import { AuthContextProvider } from "./contexts/AuthContext";

export function App() {
  return (
    <Router>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/userProfile" element={<RouteProtection />} />
        </Routes>
      </AuthContextProvider>
    </Router>
  );
}

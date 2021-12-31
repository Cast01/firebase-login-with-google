import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './contexts/AuthContext';

import { LoginPage } from './pages/LoginPage';
import { RouteProtection } from './routes/RouteProtection';

export function RoutesFunction() {
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

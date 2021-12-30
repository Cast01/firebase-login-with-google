import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { LoginPage } from './pages/LoginPage';

import { AuthContextProvider } from './contexts/AuthContext';

import { RouteProtection } from './routes/RouteProtection';

export function RoutesFunction() {
  return (
    <Router>
      <AuthContextProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/userProfile" element={<RouteProtection />} />
        </Routes>
      </AuthContextProvider>
    </Router>
  );
}

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { PageOne } from "./pages/pageOne";
import { PageTwo } from "./pages/pageTwo";

import { AuthContextProvider } from "./contexts/AuthContext";

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<PageOne />} />
          <Route path="/pageTwo" element={<PageTwo />} />
        </Routes>
      </AuthContextProvider>
    </Router>
  );
}

export default App;

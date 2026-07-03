import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Takeinput from "./components/Takeinput";
import Generatedout from "./components/Generatedout";
import ResponseProvider from "./context/Response.context";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./App.css";

const Dashboard = () => (
  <div className="flex flex-col sm:flex-row pt-20 h-screen bg-zinc-50 dark:bg-zinc-950 overflow-hidden transition-colors duration-300">
    <Takeinput />
    <Generatedout />
  </div>
);

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" />;
  return children;
};

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <ResponseProvider>
            <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white font-sans selection:bg-blue-500/30 transition-colors duration-300">
              <Toaster position="top-center" />
              <Navbar />
              <Routes>
                <Route
                  path="/"
                  element={
                    <Dashboard />
                  }
                />
                <Route path="/login" element={<Navigate to="/" />} />
                <Route path="/signup" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </ResponseProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;

import { lazy, Suspense, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import { eventBus } from "auth_mfe/EventBus";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import DashboardLayout from "./layouts/DashboardLayout";

const AuthApp = lazy(() => import("auth_mfe/AuthApp"));

function AppRoutes() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogin = () => {
      console.log("Shell received login success!");

      navigate("/dashboard");
    };

    eventBus.on("auth:login-success", handleLogin);

    return () => {
      eventBus.off("auth:login-success", handleLogin);
    };
  }, [navigate]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<AuthApp />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;

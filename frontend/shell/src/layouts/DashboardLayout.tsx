import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { eventBus } from "auth_mfe/EventBus";
import "../pages/Dashboard.css";

function DashboardLayout() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogout = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:3000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      eventBus.emit("auth:logout");
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
      setError("Logout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-layout">
      <div
        id="agencyos-sidebar"
        className={sidebarOpen ? "sidebar-open" : "sidebar-closed"}
      >
        <Sidebar />
      </div>

      <div className="dashboard-content">
        <Navbar
          onLogout={handleLogout}
          loading={loading}
          sidebarOpen={sidebarOpen}
          onMenuToggle={() => setSidebarOpen((prev) => !prev)}
        />

        {error && <p role="alert">{error}</p>}

        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;

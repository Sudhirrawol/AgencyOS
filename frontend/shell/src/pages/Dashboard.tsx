import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { eventBus } from "auth_mfe/EventBus";

function Dashboard() {
  const navigate = useNavigate();
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
      console.log("Logout error : ", error);
      setError("Logout failed. Please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>AgencyOS Dashboard</h1>
      <p>Welcome! You are logged in.</p>
      <button onClick={handleLogout} disabled={loading}>
        {loading ? "Logging out" : "Logout"}
      </button>
      {error && <p role="alert">{error}</p>}
    </div>
  );
}
export default Dashboard;

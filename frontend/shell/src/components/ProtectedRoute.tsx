import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

function ProtectedRoute() {
  // English: null means authentication is still being checked.
  // Hinglish: null matlab login status abhi check ho raha hai.
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        let response = await fetch("http://localhost:3000/api/auth/profile", {
          credentials: "include",
        });
        // English: Refresh access token when it expires.
        // Hinglish: Access token expire ho toh naya token lo.
        if (response.status === 401) {
          const refresh = await fetch(
            "http://localhost:3000/api/auth/refresh",
            {
              method: "POST",
              credentials: "include",
            },
          );

          // English: Retry profile if refresh succeeds.
          // Hinglish: Refresh successful ho toh profile dobara call karo.
          if (refresh.ok) {
            response = await fetch("http://localhost:3000/api/auth/profile", {
              credentials: "include",
            });
          }
        }
        setIsAuthenticated(response.ok);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);
  if (isAuthenticated === null) {
    return <p>Checking authentication...</p>;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}

export default ProtectedRoute;

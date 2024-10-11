import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Named export

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Get current location

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user_id = localStorage.getItem("user_id");
    console.log("auth", user_id);

    if (token && user_id) { // Check if both token and user_id exist
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
          // Token expired
          localStorage.removeItem("token");
          localStorage.removeItem("user_id");

          setIsAuthenticated(false);
          if (location.pathname !== "/login") {
            navigate("/login"); // Redirect to login if token expired
          }
        } else {
          // Token valid
          setIsAuthenticated(true);
          if (location.pathname !== "/feed") {
            navigate("/feed"); // Redirect to feed if not already there
          }
        }
      } catch (err) {
        console.error("Invalid token");
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");

        setIsAuthenticated(false);
        if (location.pathname !== "/login") {
          navigate("/login"); // Redirect to login on error
        }
      }
    } else {
      // No token found
      setIsAuthenticated(false);
      if (location.pathname !== "/login") {
        navigate("/login"); // Redirect to login if no token
      }
    }
  }, [navigate, location.pathname]);

  return isAuthenticated;
};

export default useAuth;

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

// Get the API URL from the environment variable
const API_URL = process.env.REACT_APP_API_URL;

const useAuth = () => {
  const [authData, setAuthData] = useState(null); // State to store authentication data
  const navigate = useNavigate();
  const location = useLocation(); // Get current location

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${API_URL}/users/me`, {
          withCredentials: true, // Important: allow cookies to be sent with requests
        });

        if (response.data.msg) {
          // User is authenticated
          setAuthData(response.data); // Set the authentication data
          if (location.pathname === "/login") {
            navigate("/feed"); // Redirect to feed if already logged in and on login page
          }
        } else {
          // User is not authenticated
          setAuthData(null); // Clear auth data
          if (location.pathname === "/feed") {
            navigate("/login"); // Redirect to login if not authenticated and on feed page
          }
        }
      } catch (err) {
        console.error("Authentication error:", err);
        // If an error occurs, assume the user is not authenticated
        setAuthData(null); // Clear auth data
        if (location.pathname === "/feed") {
          navigate("/login"); // Redirect to login if not authenticated and on feed page
        }
      }
    };

    checkAuth();
  }, [navigate, location.pathname]);

  return authData; // Return the authentication data
};

export default useAuth;

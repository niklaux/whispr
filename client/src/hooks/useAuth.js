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
    const token = getToken(); // Retrieve token from cookies/localStorage (your method here)

    // If there's no token, clear the state and skip the API call
    if (!token) {
      setAuthData(null);
      return;
    }

    const checkAuth = async () => {
      try {
        const response = await axios.get(`${API_URL}/users/me`, {
          withCredentials: true, // Allow cookies to be sent with requests
        });

        if (response.data.msg) {
          // User is authenticated, store the data
          setAuthData(response.data);
          if (location.pathname === "/login") {
            navigate("/feed"); // Redirect to feed if already logged in and on login page
          }
        } else {
          handleUnauthenticated();
        }
      } catch (err) {
        console.error("Authentication error:", err);
        // Handle invalid or expired token
        handleUnauthenticated();
      }
    };

    const handleUnauthenticated = () => {
      // Clear token (optional)
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      setAuthData(null);
      if (location.pathname === "/feed") {
        navigate("/login"); // Redirect to login if not authenticated and on feed page
      }
    };

    checkAuth();
  }, [navigate, location.pathname]);

  return authData; // Return only the authentication data
};

const getToken = () => {
  const cookieString = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="));

  return cookieString ? cookieString.split("=")[1] : null; // Return token or null if not found
};

export default useAuth;

import { useState, useEffect, useCallback } from "react"; // Import useCallback
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

// Get the API URL from the environment variable
const API_URL = process.env.REACT_APP_API_URL;

const useAuth = () => {
  const [authData, setAuthData] = useState(null); // State to store authentication data
  const navigate = useNavigate();
  const location = useLocation(); // Get current location

  // Define handleUnauthenticated using useCallback to avoid stale closures
  const handleUnauthenticated = useCallback(() => {
    // Clear token (optional)
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setAuthData(null);
    navigate("/login"); // Redirect to login for all invalid token cases
  }, [navigate]); // Add navigate as a dependency

  useEffect(() => {
    const token = getToken(); // Retrieve token from cookies/localStorage

    // If there's no token, redirect to login
    if (!token) {
      handleUnauthenticated();
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
        } else {
          handleUnauthenticated();
        }
      } catch (err) {
        console.error("Authentication error:", err);
        // Handle invalid or expired token
        handleUnauthenticated();
      }
    };

    checkAuth(); // Check authentication on mount
  }, [handleUnauthenticated, location.pathname]); // Include handleUnauthenticated in dependencies

  return authData; // Return only the authentication data
};

// Helper function to get the token from cookies
const getToken = () => {
  const cookieString = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="));

  return cookieString ? cookieString.split("=")[1] : null; // Return token or null if not found
};

export default useAuth;

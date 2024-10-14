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
    setAuthData(null);
    localStorage.removeItem("whisprToken"); // Clear the token from localStorage
    navigate("/login"); // Redirect to login for all invalid token cases
  }, [navigate]); // Add navigate as a dependency

  useEffect(() => {
    const token = getToken(); // Retrieve token from localStorage

    // If there's no token, redirect to login
    if (!token) {
      handleUnauthenticated();
      return;
    }

    const checkAuth = async () => {
      try {
        const response = await axios.get(`${API_URL}/users/me`, {
          headers: { Authorization: `Bearer ${token}` }, // Include the token in the Authorization header
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

// Helper function to get the token from localStorage
const getToken = () => {
  return localStorage.getItem("whisprToken"); // Retrieve token from localStorage
};

export default useAuth;

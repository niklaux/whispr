import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

// Helper function to get the token from localStorage
const getToken = () => {
  return localStorage.getItem("whisprToken"); // Retrieve token from localStorage
};

// Helper function to make API requests
const apiRequest = async (method, url, data = null) => {
  try {
    const config = {
      method,
      url,
      data,
      headers: {
        Authorization: `Bearer ${getToken()}`, // Include the token in the Authorization header
      },
      withCredentials: true, // Ensure cookies (JWT token) are sent along with the request
    };

    const response = await axios(config);
    return response.data; // Return the API response data
  } catch (error) {
    // Throw an error with a consistent message format
    throw new Error(error.response?.data?.message || error.message);
  }
};

// Login user
export const loginUser = async (loginData) => {
  return await apiRequest("post", `${API_URL}/users/login`, loginData);
};

// Sign up user
export const signupUser = async (signUpData) => {
  return await apiRequest("post", `${API_URL}/users`, signUpData);
};

// Update user details
export const updateUser = async (updateData) => {
  return await apiRequest("put", `${API_URL}/users`, updateData);
};

// Update user password
export const updatePassword = async (passwordData) => {
  return await apiRequest("put", `${API_URL}/users/password`, passwordData);
};

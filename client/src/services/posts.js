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
    throw new Error(error.response?.data?.msg || error.message);
  }
};

// Create a new post
export const createPost = async (contentData) => {
  return await apiRequest("post", `${API_URL}/posts`, contentData);
};

// Get all posts, optionally filtered by user_id
export const getPosts = async (userId) => {
  const url = userId ? `${API_URL}/posts?user_id=${userId}` : `${API_URL}/posts`;
  return await apiRequest("get", url);
};

export const deletePost = async (postId) => {
  return await apiRequest("delete", `${API_URL}/posts/${postId}`);
};
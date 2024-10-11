import axios from "axios";

const API_URL = "http://localhost:8001/api";

export const createPost = async (contentData) => {
  try {
    const response = await axios.post(`${API_URL}/posts`, contentData);
    return response;
  } catch (err) {
    throw new Error(err.response?.data?.message || err.message); // throw error to handle it in the form
  }
};

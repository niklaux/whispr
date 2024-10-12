import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const createPost = async (contentData) => {
  try {
    const response = await axios.post(`${API_URL}/posts`, contentData);
    return response;
  } catch (err) {
    throw new Error(err.response?.data?.message || err.message); // throw error to handle it in the form
  }
};

export const getPosts = async () => {
  try {
    const response = await axios.get(`${API_URL}/posts`);
    return response;
  } catch (err) {
    throw new Error(err.response?.data?.message || err.message); // throw error to handle it in the form
  }
};

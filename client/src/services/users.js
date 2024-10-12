import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const loginUser = async (loginData) => {
  console.log(API_URL)
  try {
    const response = await axios.post(`${API_URL}/users/login`, loginData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const signupUser = async (signUpData) => {
  try {
    const response = await axios.post(`${API_URL}/users`, signUpData);
    return response.data; // return the API response data
  } catch (err) {
    throw new Error(err.response?.data?.message || err.message); // throw error to handle it in the form
  }
};

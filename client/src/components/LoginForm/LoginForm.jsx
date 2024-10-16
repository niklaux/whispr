import React, { useState } from "react";
import { loginUser } from "../../services/users"; // Assuming you have a loginUser function that makes the API call
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLoginForm = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call the loginUser function and get the token and user info
      const data = await loginUser(loginForm);
      const { token } = data;

      // Store token in localStorage instead of cookies
      localStorage.setItem("whisprToken", token); // Store token in local storage
      navigate("/feed"); // Navigate to feed after successful login
    } catch (err) {
      console.error("Login failed:", err);
      setErrorMessage("Login failed. Please check your email and password.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="">
        <div className="mb-3">
          <label htmlFor="loginEmail" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control rounded-4"
            id="loginEmail"
            placeholder="Enter your email"
            name="email"
            value={loginForm.email}
            onChange={handleLoginForm}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="loginPassword" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control rounded-4"
            id="loginPassword"
            placeholder=""
            name="password"
            value={loginForm.password}
            onChange={handleLoginForm}
            required
          />
        </div>
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
        <div className="d-grid">
          <button type="submit" className="btn btn-primary rounded-4 whispr-blue-button">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;

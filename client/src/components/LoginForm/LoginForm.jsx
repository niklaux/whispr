import React, { useState } from "react";
import axios from "axios";

function LoginForm() {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(""); // For showing errors if login fails

  const handleLoginForm = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8001/api/users/login",
        loginForm
      );

      if (response.status === 200) {
        const token = response.data.token;
        // Store token in localStorage or sessionStorage
        localStorage.setItem("token", token);

        console.log("Successful login!");
        // Optionally, redirect the user to another page after login
        // window.location.href = "/dashboard"; // Example of redirecting to a dashboard
      }
    } catch (err) {
      console.error("Login failed:", err.message);
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
            className="form-control"
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
            className="form-control"
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
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;

import React, { useState } from "react";
import axios from "axios";

function LoginForm() {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

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
        console.log("sucessful login!");
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="" >
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
          />
        </div>
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

import React, { useState } from "react";

function LoginForm() {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const handleLoginForm = (e) => {
    console.log(e.target.value);
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div>
      <form>
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

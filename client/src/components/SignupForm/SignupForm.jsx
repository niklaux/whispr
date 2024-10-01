import React, { useState } from "react";

function SignupForm() {
  const [signUpData, setSignUpData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSignUpData = (e) => {
    console.log(e.target.value);
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div>
      <form>
        <div className="mb-3">
          <label htmlFor="signUpName" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="signUpName"
            placeholder="Enter your Username"
            name="username"
            value={signUpData.username}
            onChange={handleSignUpData}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="signUpEmail" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="signUpEmail"
            placeholder="Enter your email"
            name="email"
            value={signUpData.email}
            onChange={handleSignUpData}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="signUpPassword" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="signUpPassword"
            placeholder="Enter your password"
            name="password"
            value={signUpData.password}
            onChange={handleSignUpData}
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-success">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;

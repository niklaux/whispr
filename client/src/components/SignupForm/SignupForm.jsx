import React, { useState } from "react";
import axios from "axios";

function SignupForm() {
  const initialFormData = {
    username: "",
    email: "",
    password: "",
  };
  const [signUpData, setSignUpData] = useState(initialFormData);

  const handleSignUpData = (e) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8001/api/users",
        signUpData
      );
      setSignUpData(initialFormData);
      console.log(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
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

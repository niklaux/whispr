import React, { useState } from "react";
import { signupUser } from "../../services/users"; // Your service function to make the API call

function SignupForm() {
  const initialFormData = {
    username: "",
    email: "",
    password: "",
  };
  const [signUpData, setSignUpData] = useState(initialFormData);
  const [message, setMessage] = useState(""); // For success/error messages

  const handleSignUpData = (e) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages

    try {
      const response = await signupUser(signUpData); // Make API call

      if (response.status === 201) {
        // Success: account was created
        setSignUpData(initialFormData); // Reset form
        setMessage("Account created successfully!"); // Show success message
      }
    } catch (err) {
      const errorMsg =
        err.response?.data?.error || "An error occurred. Please try again.";
      setMessage(errorMsg); // Show backend error or generic error message
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
            className="form-control rounded-5"
            id="signUpName"
            placeholder="Enter your Username"
            name="username"
            value={signUpData.username}
            onChange={handleSignUpData}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="signUpEmail" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control rounded-5"
            id="signUpEmail"
            placeholder="Enter your email"
            name="email"
            value={signUpData.email}
            onChange={handleSignUpData}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="signUpPassword" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control rounded-5"
            id="signUpPassword"
            placeholder="Enter your password"
            name="password"
            value={signUpData.password}
            onChange={handleSignUpData}
            required
          />
        </div>
        {message && (
          <div
            className={`alert ${
              message.includes("success") ? "alert-success" : "alert-danger"
            }`}
          >
            {message}
          </div>
        )}
        <div className="d-grid">
          <button type="submit" className="btn btn-success rounded-5">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;

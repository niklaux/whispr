import React from "react";
import { useState } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import SignupForm from "../../components/SignupForm/SignupForm";
import useAuth from "../../hooks/useAuth";

function LoginPage() {
  useAuth();

  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div
      className="d-flex flex-column justify-content-center common-bg-color overflow-hidden"
      style={{ height: "100vh" }}
    >
      <div className="row justify-content-center">
        <div className="col-md-5 col-lg-3 col-10">
          <div className="card border-0 rounded-5">
            <div className="card-body p-4">
              <h3 className="text-center fw-bold mb-4 whispr-blue-text">
                {isLogin ? "Login" : "Sign Up"}
              </h3>

              {/* Login Form */}
              {isLogin ? (
                <LoginForm />
              ) : (
                /* Sign-Up Form */
                <SignupForm />
              )}

              {/* Toggle Button */}
              <div className="text-center mt-4">
                {isLogin ? (
                  <p className="m-0">
                    Don't have an account?{" "}
                    <button className="btn btn-link" onClick={toggleForm}>
                      Sign Up
                    </button>
                  </p>
                ) : (
                  <p className="m-0">
                    Already have an account?{" "}
                    <button className="btn btn-link" onClick={toggleForm}>
                      Login
                    </button>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

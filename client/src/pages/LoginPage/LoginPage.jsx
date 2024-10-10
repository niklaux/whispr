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
          <div className="card shadow-sm border-0 rounded-5">
            <div className="card-body px-4">
              <h3 className="text-center mb-4">
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
                  <p>
                    Don't have an account?{" "}
                    <button className="btn btn-link" onClick={toggleForm}>
                      Sign Up
                    </button>
                  </p>
                ) : (
                  <p>
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

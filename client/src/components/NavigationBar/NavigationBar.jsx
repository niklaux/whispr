import React from "react";
import { CircleUserRound, LogOut } from "lucide-react"; // Import the LogOut icon
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import "./NavigationBar.css";

function NavigationBar() {
  const navigate = useNavigate(); // Initialize navigate for redirection

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem("whisprToken"); // Remove the token
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="navbar navbar-expand-lg py-2 fixed-top">
      <div className="container d-flex">
        <Link
          className="navbar-brand fw-bold whispr-blue-text"
          href="#home"
          to="/feed"
        >
          whispr
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className="nav-link d-flex align-items-center justify-content-center whispr-blue-text"
                to="/my-account"
              >
                <CircleUserRound size={19} className="me-2" /> User
              </Link>
            </li>
            <li className="nav-item">
              <a
                className="nav-link d-flex align-items-center justify-content-center whispr-blue-text"
                href="#contact"
                onClick={handleLogout} // Call handleLogout on click
              >
                <LogOut size={19} className="me-2" /> Logout
              </a>
            </li>
            {/* <li className="nav-item">
              <button
                className="nav-link d-flex align-items-center justify-content-center whispr-blue-text border-0 bg-transparent"
                onClick={handleLogout} // Call handleLogout on click
              >
                <LogOut size={19} className="me-2" /> Logout
              </button>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;

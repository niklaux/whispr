import React from "react";
import { CircleUserRound, Home } from "lucide-react";
import "./NavigationBar.css";

function NavigationBar() {
  const handleScroll = (e, sectionId) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="navbar navbar-expand-lg py-2 fixed-top">
      <div className="container d-flex">
        <a
          className="navbar-brand fw-bold whispr-blue-text"
          href="#home"
          onClick={(e) => handleScroll(e, "home")}
        >
          whispr
        </a>
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
              <a
                className="nav-link d-flex align-items-center justify-content-center whispr-blue-text"
                href="#contact"
                onClick={(e) => handleScroll(e, "contact")}
              >
                <Home size={19} className="me-2" /> Home
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link d-flex align-items-center justify-content-center whispr-blue-text"
                href="#contact"
                onClick={(e) => handleScroll(e, "contact")}
              >
                <CircleUserRound size={19} className="me-2" /> User
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;

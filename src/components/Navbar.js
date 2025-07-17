import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import ThemeSettings from "./ThemeSettings";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const navItems = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/team", label: "Team" },
  { path: "/events", label: "Events" },
  { path: "/gallery", label: "Gallery" },
  { path: "/discovery", label: "Discovery" },
  { path: "/quiz", label: "Quiz" },
  { path: "/contact", label: "Contact" },
];

const Navbar = () => {
  const { pathname } = useLocation();
  const {
    currentTheme,
    toggleDarkMode,
    isDarkMode,
    getThemeIcon,
    themeConfig,
  } = useTheme();

  const [showThemeSettings, setShowThemeSettings] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light glass elevation-2">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand gradient-text">
            🧮 RMSC COEP
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleMobileMenu}
            aria-controls="navbarNav"
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`collapse navbar-collapse${
              isMobileMenuOpen ? " show" : ""
            }`}
            id="navbarNav"
          >
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {navItems.map(({ path, label }) => (
                <li
                  key={path}
                  className={`nav-item${pathname === path ? " active" : ""}`}
                >
                  <Link
                    to={path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`nav-link${pathname === path ? " active" : ""} ${
                      label === "Home" ? "btn btn-primary mx-1" : ""
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li className="nav-item d-flex align-items-center">
                <button
                  onClick={toggleDarkMode}
                  className="btn btn-outline-secondary mx-1"
                  title={`Switch to ${isDarkMode ? "Light" : "Dark"} Mode`}
                >
                  {isDarkMode ? "☀️" : "🌙"}
                </button>
                <button
                  onClick={() => setShowThemeSettings(true)}
                  className="btn btn-outline-secondary mx-1"
                  title="Open Theme Settings"
                >
                  <span className="settings-icon">🎨</span>
                  <span className="current-theme-indicator">
                    {getThemeIcon(currentTheme)}
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div
          className="theme-indicator-bar"
          style={{ background: themeConfig.gradient }}
        ></div>
      </nav>
      <ThemeSettings
        isOpen={showThemeSettings}
        onClose={() => setShowThemeSettings(false)}
      />
    </>
  );
};

export default Navbar;

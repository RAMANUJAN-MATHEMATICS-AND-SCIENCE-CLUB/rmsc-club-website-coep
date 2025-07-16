import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import ThemeSettings from "./ThemeSettings";
import "./Navbar.css";

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
      <nav className="navbar glass elevation-2">
        <div className="navbar-container">
          <div className="navbar-logo">
            <Link to="/" className="nav-title gradient-text">
              🧮 RMSC COEP
            </Link>
          </div>

          <ul className={`nav-links ${isMobileMenuOpen ? "mobile-open" : ""}`}>
            {navItems.map(({ path, label }) => (
              <li
                key={path}
                className={pathname === path ? "nav-item active" : "nav-item"}
              >
                <Link
                  to={path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="nav-link"
                >
                  {label}
                </Link>
              </li>
            ))}

            <li className="nav-item theme-controls">
              <button
                onClick={toggleDarkMode}
                className="theme-btn quick-toggle"
                title={`Switch to ${isDarkMode ? "Light" : "Dark"} Mode`}
              >
                {isDarkMode ? "☀️" : "🌙"}
              </button>

              <button
                onClick={() => setShowThemeSettings(true)}
                className="theme-btn settings-btn"
                title="Open Theme Settings"
              >
                <span className="settings-icon">🎨</span>
                <span className="current-theme-indicator">
                  {getThemeIcon(currentTheme)}
                </span>
              </button>
            </li>
          </ul>

          <button
            className="mobile-menu-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle Mobile Menu"
          >
            <span className={`hamburger ${isMobileMenuOpen ? "open" : ""}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>

        {/* Theme indicator bar */}
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

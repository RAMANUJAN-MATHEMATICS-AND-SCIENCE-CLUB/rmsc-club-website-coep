import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="copyright">
          © 2025 Ramanujan Mathematics and Science Club, COEP Technological
          University
        </p>
        <a
          href="https://instagram.com/rmsc_coep"
          className="instagram-link"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow us on Instagram"
        >
          📸
        </a>
      </div>
    </footer>
  );
};

export default Footer;

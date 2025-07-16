import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import "./ThemeSettings.css";

const ThemeSettings = ({ isOpen, onClose }) => {
  const {
    currentTheme,
    animationMode,
    autoTheme,
    highContrast,
    reducedMotion,
    customAccent,
    availableThemes,
    availableAnimations,
    themeConfigs,
    animationConfigs,
    setTheme,
    setAnimationType,
    toggleAutoTheme,
    toggleHighContrast,
    toggleReducedMotion,
    setAccentColor,
    resetTheme,
    getThemeIcon,
    getAnimationIcon,
  } = useTheme();

  const [showColorPicker, setShowColorPicker] = useState(false);
  const [tempAccentColor, setTempAccentColor] = useState(
    customAccent || "#ed64a6"
  );

  const handleAccentColorSave = () => {
    setAccentColor(tempAccentColor);
    setShowColorPicker(false);
  };

  if (!isOpen) return null;

  return (
    <div className="theme-settings-overlay" onClick={onClose}>
      <div
        className="theme-settings-panel"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="theme-settings-header">
          <h2 className="gradient-text">🎨 Theme Customization</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="theme-settings-content">
          {/* Theme Selection */}
          <section className="settings-section">
            <h3>🌈 Color Themes</h3>
            <div className="theme-grid">
              {availableThemes.map((theme) => (
                <div
                  key={theme}
                  className={`theme-option ${
                    currentTheme === theme ? "active" : ""
                  }`}
                  onClick={() => setTheme(theme)}
                >
                  <div
                    className="theme-preview"
                    style={{
                      background: themeConfigs[theme].gradient,
                      border:
                        currentTheme === theme
                          ? "3px solid var(--color-accent)"
                          : "2px solid transparent",
                    }}
                  >
                    <span className="theme-icon">{getThemeIcon(theme)}</span>
                  </div>
                  <span className="theme-name">{themeConfigs[theme].name}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Animation Settings */}
          <section className="settings-section">
            <h3>⚡ Animation Style</h3>
            <div className="animation-grid">
              {availableAnimations.map((animation) => (
                <div
                  key={animation}
                  className={`animation-option ${
                    animationMode === animation ? "active" : ""
                  }`}
                  onClick={() => setAnimationType(animation)}
                >
                  <span className="animation-icon">
                    {getAnimationIcon(animation)}
                  </span>
                  <span className="animation-name">
                    {animationConfigs[animation].name}
                  </span>
                  <span className="animation-duration">
                    {animationConfigs[animation].duration}ms
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Custom Accent Color */}
          <section className="settings-section">
            <h3>🎯 Custom Accent Color</h3>
            <div className="accent-color-section">
              <div
                className="accent-preview"
                style={{ backgroundColor: tempAccentColor }}
                onClick={() => setShowColorPicker(!showColorPicker)}
              >
                {customAccent ? "🎨" : "+"}
              </div>
              {showColorPicker && (
                <div className="color-picker-popup">
                  <input
                    type="color"
                    value={tempAccentColor}
                    onChange={(e) => setTempAccentColor(e.target.value)}
                    className="color-input"
                  />
                  <div className="color-picker-actions">
                    <button
                      className="btn-theme btn-sm"
                      onClick={handleAccentColorSave}
                    >
                      Apply
                    </button>
                    <button
                      className="btn-theme btn-sm btn-secondary"
                      onClick={() => setShowColorPicker(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Smart Features */}
          <section className="settings-section">
            <h3>🤖 Smart Features</h3>
            <div className="toggle-options">
              <div className="toggle-item">
                <div className="toggle-info">
                  <span className="toggle-label">🕐 Auto Theme</span>
                  <span className="toggle-description">
                    Theme changes based on time of day
                  </span>
                </div>
                <button
                  className={`toggle-btn ${autoTheme ? "active" : ""}`}
                  onClick={toggleAutoTheme}
                >
                  <span className="toggle-slider"></span>
                </button>
              </div>
            </div>
          </section>

          {/* Accessibility */}
          <section className="settings-section">
            <h3>♿ Accessibility</h3>
            <div className="toggle-options">
              <div className="toggle-item">
                <div className="toggle-info">
                  <span className="toggle-label">🔍 High Contrast</span>
                  <span className="toggle-description">
                    Enhanced contrast for better visibility
                  </span>
                </div>
                <button
                  className={`toggle-btn ${highContrast ? "active" : ""}`}
                  onClick={toggleHighContrast}
                >
                  <span className="toggle-slider"></span>
                </button>
              </div>

              <div className="toggle-item">
                <div className="toggle-info">
                  <span className="toggle-label">🐌 Reduced Motion</span>
                  <span className="toggle-description">
                    Minimize animations for sensitive users
                  </span>
                </div>
                <button
                  className={`toggle-btn ${reducedMotion ? "active" : ""}`}
                  onClick={toggleReducedMotion}
                >
                  <span className="toggle-slider"></span>
                </button>
              </div>
            </div>
          </section>

          {/* Reset Options */}
          <section className="settings-section">
            <h3>🔄 Reset</h3>
            <button className="btn-theme btn-reset" onClick={resetTheme}>
              Reset to Default Theme
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ThemeSettings;

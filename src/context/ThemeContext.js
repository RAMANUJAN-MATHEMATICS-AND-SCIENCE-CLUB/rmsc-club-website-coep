import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from "react";

const ThemeContext = createContext();

// Enhanced Theme configurations with more theme options
const THEME_CONFIGS = {
  light: {
    name: "Light",
    primary: "#667eea",
    secondary: "#764ba2",
    background: "#ffffff",
    surface: "#f8fafc",
    text: "#2d3748",
    textSecondary: "#4a5568",
    accent: "#ed64a6",
    success: "#48bb78",
    warning: "#ed8936",
    error: "#f56565",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    glassMorphism: "rgba(255, 255, 255, 0.1)",
    shadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
    icon: "☀️",
  },
  dark: {
    name: "Dark",
    primary: "#9f7aea",
    secondary: "#667eea",
    background: "#1a202c",
    surface: "#2d3748",
    text: "#f7fafc",
    textSecondary: "#a0aec0",
    accent: "#ed64a6",
    success: "#68d391",
    warning: "#fbb02d",
    error: "#fc8181",
    gradient: "linear-gradient(135deg, #9f7aea 0%, #667eea 100%)",
    glassMorphism: "rgba(0, 0, 0, 0.3)",
    shadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
    icon: "🌙",
  },
  ocean: {
    name: "Ocean",
    primary: "#0ea5e9",
    secondary: "#06b6d4",
    background: "#f0f9ff",
    surface: "#e0f7fa",
    text: "#0f172a",
    textSecondary: "#334155",
    accent: "#10b981",
    success: "#059669",
    warning: "#f59e0b",
    error: "#dc2626",
    gradient: "linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)",
    glassMorphism: "rgba(14, 165, 233, 0.1)",
    shadow: "0 10px 30px rgba(14, 165, 233, 0.2)",
    icon: "🌊",
  },
  sunset: {
    name: "Sunset",
    primary: "#f97316",
    secondary: "#ea580c",
    background: "#fffbeb",
    surface: "#fef3c7",
    text: "#1c1917",
    textSecondary: "#57534e",
    accent: "#dc2626",
    success: "#16a34a",
    warning: "#ca8a04",
    error: "#dc2626",
    gradient: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
    glassMorphism: "rgba(249, 115, 22, 0.1)",
    shadow: "0 10px 30px rgba(249, 115, 22, 0.2)",
    icon: "🌅",
  },
  forest: {
    name: "Forest",
    primary: "#16a34a",
    secondary: "#15803d",
    background: "#f0fdf4",
    surface: "#dcfce7",
    text: "#14532d",
    textSecondary: "#166534",
    accent: "#84cc16",
    success: "#22c55e",
    warning: "#eab308",
    error: "#dc2626",
    gradient: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
    glassMorphism: "rgba(22, 163, 74, 0.1)",
    shadow: "0 10px 30px rgba(22, 163, 74, 0.2)",
    icon: "🌲",
  },
  cosmic: {
    name: "Cosmic",
    primary: "#8b5cf6",
    secondary: "#a855f7",
    background: "#0f0f23",
    surface: "#1e1b4b",
    text: "#e2e8f0",
    textSecondary: "#94a3b8",
    accent: "#f59e0b",
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    gradient: "linear-gradient(135deg, #8b5cf6 0%, #a855f7 50%, #ec4899 100%)",
    glassMorphism: "rgba(139, 92, 246, 0.1)",
    shadow: "0 10px 30px rgba(139, 92, 246, 0.3)",
    icon: "🌌",
  },
  cherry: {
    name: "Cherry Blossom",
    primary: "#ec4899",
    secondary: "#be185d",
    background: "#fdf2f8",
    surface: "#fce7f3",
    text: "#831843",
    textSecondary: "#9d174d",
    accent: "#f97316",
    success: "#059669",
    warning: "#d97706",
    error: "#dc2626",
    gradient: "linear-gradient(135deg, #ec4899 0%, #be185d 100%)",
    glassMorphism: "rgba(236, 72, 153, 0.1)",
    shadow: "0 10px 30px rgba(236, 72, 153, 0.2)",
    icon: "🌸",
  },
  arctic: {
    name: "Arctic",
    primary: "#0ea5e9",
    secondary: "#0284c7",
    background: "#f0f9ff",
    surface: "#e0f2fe",
    text: "#0c4a6e",
    textSecondary: "#075985",
    accent: "#06b6d4",
    success: "#059669",
    warning: "#d97706",
    error: "#dc2626",
    gradient: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
    glassMorphism: "rgba(14, 165, 233, 0.1)",
    shadow: "0 10px 30px rgba(14, 165, 233, 0.2)",
    icon: "❄️",
  },
};

// Animation configurations
const ANIMATION_CONFIGS = {
  none: { name: "None", duration: 0 },
  smooth: { name: "Smooth", duration: 300 },
  bouncy: { name: "Bouncy", duration: 400 },
  elastic: { name: "Elastic", duration: 600 },
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // Core theme state
  const [currentTheme, setCurrentTheme] = useState("light");
  const [animationMode, setAnimationMode] = useState("smooth");
  const [autoTheme, setAutoTheme] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [customAccent, setCustomAccent] = useState(null);

  // Theme persistence
  useEffect(() => {
    const savedTheme = localStorage.getItem("rmsc-theme");
    const savedAnimation = localStorage.getItem("rmsc-animation");
    const savedAutoTheme = localStorage.getItem("rmsc-auto-theme");
    const savedHighContrast = localStorage.getItem("rmsc-high-contrast");
    const savedReducedMotion = localStorage.getItem("rmsc-reduced-motion");
    const savedCustomAccent = localStorage.getItem("rmsc-custom-accent");

    if (savedTheme && THEME_CONFIGS[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
    if (savedAnimation && ANIMATION_CONFIGS[savedAnimation]) {
      setAnimationMode(savedAnimation);
    }
    if (savedAutoTheme) {
      setAutoTheme(JSON.parse(savedAutoTheme));
    }
    if (savedHighContrast) {
      setHighContrast(JSON.parse(savedHighContrast));
    }
    if (savedReducedMotion) {
      setReducedMotion(JSON.parse(savedReducedMotion));
    }
    if (savedCustomAccent) {
      setCustomAccent(savedCustomAccent);
    }

    // Check for system preferences
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setReducedMotion(true);
    }
  }, []);

  // Auto theme based on time
  useEffect(() => {
    if (!autoTheme) return;

    const updateThemeByTime = () => {
      const hour = new Date().getHours();
      let newTheme = "light";

      if (hour >= 6 && hour < 12) {
        newTheme = "light"; // Morning
      } else if (hour >= 12 && hour < 17) {
        newTheme = "ocean"; // Afternoon
      } else if (hour >= 17 && hour < 20) {
        newTheme = "sunset"; // Evening
      } else {
        newTheme = "dark"; // Night
      }

      if (newTheme !== currentTheme) {
        setCurrentTheme(newTheme);
      }
    };

    updateThemeByTime();
    const interval = setInterval(updateThemeByTime, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [autoTheme, currentTheme]);

  // Save preferences
  useEffect(() => {
    localStorage.setItem("rmsc-theme", currentTheme);
  }, [currentTheme]);

  useEffect(() => {
    localStorage.setItem("rmsc-animation", animationMode);
  }, [animationMode]);

  useEffect(() => {
    localStorage.setItem("rmsc-auto-theme", JSON.stringify(autoTheme));
  }, [autoTheme]);

  useEffect(() => {
    localStorage.setItem("rmsc-high-contrast", JSON.stringify(highContrast));
  }, [highContrast]);

  useEffect(() => {
    localStorage.setItem("rmsc-reduced-motion", JSON.stringify(reducedMotion));
  }, [reducedMotion]);

  useEffect(() => {
    if (customAccent) {
      localStorage.setItem("rmsc-custom-accent", customAccent);
    }
  }, [customAccent]);

  // Theme functions
  const setTheme = useCallback((themeName) => {
    if (THEME_CONFIGS[themeName]) {
      setCurrentTheme(themeName);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    const themes = Object.keys(THEME_CONFIGS);
    const currentIndex = themes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setCurrentTheme(themes[nextIndex]);
  }, [currentTheme]);

  const toggleDarkMode = useCallback(() => {
    setCurrentTheme(currentTheme === "dark" ? "light" : "dark");
  }, [currentTheme]);

  const setAnimationType = useCallback((type) => {
    if (ANIMATION_CONFIGS[type]) {
      setAnimationMode(type);
    }
  }, []);

  const toggleAutoTheme = useCallback(() => {
    setAutoTheme((prev) => !prev);
  }, []);

  const toggleHighContrast = useCallback(() => {
    setHighContrast((prev) => !prev);
  }, []);

  const toggleReducedMotion = useCallback(() => {
    setReducedMotion((prev) => !prev);
  }, []);

  const setAccentColor = useCallback((color) => {
    setCustomAccent(color);
  }, []);

  const resetTheme = useCallback(() => {
    setCurrentTheme("light");
    setAnimationMode("smooth");
    setAutoTheme(false);
    setHighContrast(false);
    setReducedMotion(false);
    setCustomAccent(null);
    localStorage.removeItem("rmsc-theme");
    localStorage.removeItem("rmsc-animation");
    localStorage.removeItem("rmsc-auto-theme");
    localStorage.removeItem("rmsc-high-contrast");
    localStorage.removeItem("rmsc-reduced-motion");
    localStorage.removeItem("rmsc-custom-accent");
  }, []);

  // Computed theme object
  const themeConfig = useMemo(() => {
    const baseTheme = THEME_CONFIGS[currentTheme];
    const theme = { ...baseTheme };

    // Apply custom accent color
    if (customAccent) {
      theme.accent = customAccent;
    }

    // Apply high contrast adjustments
    if (highContrast) {
      theme.text = currentTheme === "dark" ? "#ffffff" : "#000000";
      theme.background = currentTheme === "dark" ? "#000000" : "#ffffff";
    }

    return theme;
  }, [currentTheme, customAccent, highContrast]);

  // Apply CSS variables
  useEffect(() => {
    const root = document.documentElement;
    Object.entries(themeConfig).forEach(([key, value]) => {
      if (typeof value === "string") {
        root.style.setProperty(`--color-${key}`, value);
      }
    });

    // Animation duration
    const duration = reducedMotion
      ? 0
      : ANIMATION_CONFIGS[animationMode].duration;
    root.style.setProperty("--animation-duration", `${duration}ms`);

    // Theme class
    root.className = `theme-${currentTheme} ${
      highContrast ? "high-contrast" : ""
    } ${reducedMotion ? "reduced-motion" : ""}`;
  }, [themeConfig, animationMode, reducedMotion, highContrast, currentTheme]);

  const contextValue = useMemo(
    () => ({
      // Current state
      currentTheme,
      animationMode,
      autoTheme,
      highContrast,
      reducedMotion,
      customAccent,
      themeConfig,

      // Available options
      availableThemes: Object.keys(THEME_CONFIGS),
      availableAnimations: Object.keys(ANIMATION_CONFIGS),
      themeConfigs: THEME_CONFIGS,
      animationConfigs: ANIMATION_CONFIGS,

      // Actions
      setTheme,
      toggleTheme,
      toggleDarkMode,
      setAnimationType,
      toggleAutoTheme,
      toggleHighContrast,
      toggleReducedMotion,
      setAccentColor,
      resetTheme,

      // Utilities
      isDarkMode: currentTheme === "dark",
      isLightMode: currentTheme === "light",
      getThemeIcon: (themeName) => THEME_CONFIGS[themeName]?.icon || "🎨",
      getAnimationIcon: (animationType) => {
        const icons = { none: "⏸️", smooth: "▶️", bouncy: "🏀", elastic: "🎯" };
        return icons[animationType] || "🎨";
      },
    }),
    [
      currentTheme,
      animationMode,
      autoTheme,
      highContrast,
      reducedMotion,
      customAccent,
      themeConfig,
      setTheme,
      toggleTheme,
      toggleDarkMode,
      setAnimationType,
      toggleAutoTheme,
      toggleHighContrast,
      toggleReducedMotion,
      setAccentColor,
      resetTheme,
    ]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <div
        className={`theme-wrapper theme-${currentTheme} ${
          highContrast ? "high-contrast" : ""
        } ${reducedMotion ? "reduced-motion" : ""}`}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

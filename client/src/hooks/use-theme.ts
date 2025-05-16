import { useState, useEffect, useCallback } from "react";

type Theme = "dark" | "light";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check if theme is stored in localStorage
    const storedTheme = localStorage.getItem("theme") as Theme | null;
    if (storedTheme) {
      return storedTheme;
    }
    
    // Check if user prefers dark mode
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    
    return "dark"; // Default to dark theme
  });

  // Apply theme to document
  useEffect(() => {
    const root = window.document.documentElement;
    
    root.classList.remove("dark", "light");
    root.classList.add(theme);
    
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle between dark and light
  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  }, []);

  return {
    theme,
    setTheme,
    toggleTheme,
    isDark: theme === "dark",
  };
}

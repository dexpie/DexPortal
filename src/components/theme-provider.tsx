"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// Default context value to prevent SSR errors
const defaultContext: ThemeContextType = {
  theme: "light",
  toggleTheme: () => {},
};

const ThemeContext = createContext<ThemeContextType>(defaultContext);

function applyTheme(newTheme: Theme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  const isDark = newTheme === "dark";
  root.classList.toggle("light", !isDark);
  root.classList.toggle("dark", isDark);
  root.style.colorScheme = newTheme;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "light";
    return (localStorage.getItem("theme") as Theme | null) ?? "light";
  });

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
  };

  // Always render children, even during SSR - context has defaults
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

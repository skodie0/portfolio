import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "light") {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    } else {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative w-10 h-10 rounded-lg bg-secondary/50 border border-border/50 flex items-center justify-center hover:bg-secondary hover:border-primary/30 transition-all duration-300"
      aria-label="Toggle theme"
    >
      <Sun
        size={18}
        className={`absolute transition-all duration-300 ${
          isDark ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100 text-primary"
        }`}
      />
      <Moon
        size={18}
        className={`absolute transition-all duration-300 ${
          isDark ? "opacity-100 rotate-0 scale-100 text-primary" : "opacity-0 -rotate-90 scale-0"
        }`}
      />
    </button>
  );
};

"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="w-full flex items-center gap-2 px-4 py-2 text-sm whitespace-nowrap"
      >
        {theme === "dark" ? (
          <>
            <Sun size={20} />
            <span>Light Mode</span>
          </>
        ) : (
          <>
            <Moon size={20} />
            <span>Dark Mode</span>
          </>
        )}
      </button>
  );
}
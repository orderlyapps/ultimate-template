import { useEffect, useState } from "react";
import { useThemeStore } from "./themeStore";

export function useTheme() {
  const preference = useThemeStore((state) => state.preference);
  const [systemIsDark, setSystemIsDark] = useState(() =>
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  const isDark = preference === "system" ? systemIsDark : preference === "dark";

  useEffect(() => {
    const applyTheme = (isDark: boolean) => {
      document.documentElement.classList.toggle("dark", isDark);
      document.documentElement.classList.toggle("ion-palette-dark", isDark);
    };

    if (preference === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      applyTheme(mediaQuery.matches);

      const handler = (e: MediaQueryListEvent) => {
        setSystemIsDark(e.matches);
        applyTheme(e.matches);
      };
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    } else {
      applyTheme(preference === "dark");
    }
  }, [preference]);

  return isDark;
}

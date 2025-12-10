import { useEffect } from "react";
import { useThemeStore } from "./themeStore";

export function useTheme() {
  const preference = useThemeStore((state) => state.preference);

  useEffect(() => {
    const applyTheme = (isDark: boolean) => {
      document.documentElement.classList.toggle("ion-palette-dark", isDark);
    };

    if (preference === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      applyTheme(mediaQuery.matches);

      const handler = (e: MediaQueryListEvent) => applyTheme(e.matches);
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    } else {
      applyTheme(preference === "dark");
    }
  }, [preference]);
}

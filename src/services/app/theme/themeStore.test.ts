import { describe, it, expect, beforeEach } from "vitest";
import type { ThemePreference } from "./themeStore";
import { useThemeStore } from "./themeStore";

describe("themeStore", () => {
  beforeEach(() => {
    // Reset store to default state before each test
    useThemeStore.setState({ preference: "system" });
  });

  it("should have 'system' as the default preference", () => {
    const { preference } = useThemeStore.getState();
    expect(preference).toBe("system");
  });

  it("should update preference to 'dark'", () => {
    const { setPreference } = useThemeStore.getState();
    setPreference("dark");

    const { preference } = useThemeStore.getState();
    expect(preference).toBe("dark");
  });

  it("should update preference to 'light'", () => {
    const { setPreference } = useThemeStore.getState();
    setPreference("light");

    const { preference } = useThemeStore.getState();
    expect(preference).toBe("light");
  });

  it("should update preference to 'system'", () => {
    const { setPreference } = useThemeStore.getState();
    // First set to something else
    setPreference("dark");
    expect(useThemeStore.getState().preference).toBe("dark");

    // Then set back to system
    setPreference("system");
    expect(useThemeStore.getState().preference).toBe("system");
  });

  it("should allow cycling through all theme preferences", () => {
    const { setPreference } = useThemeStore.getState();
    const preferences: ThemePreference[] = ["light", "dark", "system"];

    preferences.forEach((pref) => {
      setPreference(pref);
      expect(useThemeStore.getState().preference).toBe(pref);
    });
  });

  it("should expose setPreference function", () => {
    const { setPreference } = useThemeStore.getState();
    expect(typeof setPreference).toBe("function");
  });
});

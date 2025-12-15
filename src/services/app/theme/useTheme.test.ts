import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useTheme } from "./useTheme";
import { useThemeStore } from "./themeStore";

describe("useTheme", () => {
  let mockMatchMedia: ReturnType<typeof vi.fn>;
  let mediaQueryListeners: ((e: MediaQueryListEvent) => void)[] = [];

  beforeEach(() => {
    // Reset store
    useThemeStore.setState({ preference: "system" });

    // Clear any existing classes
    document.documentElement.classList.remove("ion-palette-dark");

    // Reset listeners array
    mediaQueryListeners = [];

    // Create a more sophisticated matchMedia mock
    mockMatchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn((event: string, handler: (e: MediaQueryListEvent) => void) => {
        if (event === "change") {
          mediaQueryListeners.push(handler);
        }
      }),
      removeEventListener: vi.fn((event: string, handler: (e: MediaQueryListEvent) => void) => {
        if (event === "change") {
          mediaQueryListeners = mediaQueryListeners.filter((h) => h !== handler);
        }
      }),
      dispatchEvent: vi.fn(),
    }));

    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: mockMatchMedia,
    });
  });

  afterEach(() => {
    document.documentElement.classList.remove("ion-palette-dark");
    mediaQueryListeners = [];
  });

  describe("with system preference", () => {
    it("should apply light theme when system prefers light", () => {
      mockMatchMedia.mockImplementation((query: string) => ({
        matches: false, // System prefers light
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      renderHook(() => useTheme());

      expect(document.documentElement.classList.contains("ion-palette-dark")).toBe(false);
    });

    it("should apply dark theme when system prefers dark", () => {
      mockMatchMedia.mockImplementation((query: string) => ({
        matches: true, // System prefers dark
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      renderHook(() => useTheme());

      expect(document.documentElement.classList.contains("ion-palette-dark")).toBe(true);
    });

    it("should add event listener for system preference changes", () => {
      const addEventListenerMock = vi.fn();
      mockMatchMedia.mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: addEventListenerMock,
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      renderHook(() => useTheme());

      expect(addEventListenerMock).toHaveBeenCalledWith("change", expect.any(Function));
    });

    it("should remove event listener on cleanup", () => {
      const removeEventListenerMock = vi.fn();
      mockMatchMedia.mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: removeEventListenerMock,
        dispatchEvent: vi.fn(),
      }));

      const { unmount } = renderHook(() => useTheme());
      unmount();

      expect(removeEventListenerMock).toHaveBeenCalledWith("change", expect.any(Function));
    });
  });

  describe("with explicit dark preference", () => {
    beforeEach(() => {
      useThemeStore.setState({ preference: "dark" });
    });

    it("should apply dark theme class", () => {
      renderHook(() => useTheme());

      expect(document.documentElement.classList.contains("ion-palette-dark")).toBe(true);
    });

    it("should not add media query listener", () => {
      const addEventListenerMock = vi.fn();
      mockMatchMedia.mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: addEventListenerMock,
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      renderHook(() => useTheme());

      expect(addEventListenerMock).not.toHaveBeenCalled();
    });
  });

  describe("with explicit light preference", () => {
    beforeEach(() => {
      useThemeStore.setState({ preference: "light" });
    });

    it("should not apply dark theme class", () => {
      renderHook(() => useTheme());

      expect(document.documentElement.classList.contains("ion-palette-dark")).toBe(false);
    });

    it("should remove dark theme class if it was previously set", () => {
      document.documentElement.classList.add("ion-palette-dark");

      renderHook(() => useTheme());

      expect(document.documentElement.classList.contains("ion-palette-dark")).toBe(false);
    });

    it("should not add media query listener", () => {
      const addEventListenerMock = vi.fn();
      mockMatchMedia.mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: addEventListenerMock,
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      renderHook(() => useTheme());

      expect(addEventListenerMock).not.toHaveBeenCalled();
    });
  });

  describe("preference changes", () => {
    it("should update theme when preference changes from system to dark", () => {
      const { rerender } = renderHook(() => useTheme());

      expect(document.documentElement.classList.contains("ion-palette-dark")).toBe(false);

      act(() => {
        useThemeStore.setState({ preference: "dark" });
      });
      rerender();

      expect(document.documentElement.classList.contains("ion-palette-dark")).toBe(true);
    });

    it("should update theme when preference changes from dark to light", () => {
      useThemeStore.setState({ preference: "dark" });
      const { rerender } = renderHook(() => useTheme());

      expect(document.documentElement.classList.contains("ion-palette-dark")).toBe(true);

      act(() => {
        useThemeStore.setState({ preference: "light" });
      });
      rerender();

      expect(document.documentElement.classList.contains("ion-palette-dark")).toBe(false);
    });
  });
});

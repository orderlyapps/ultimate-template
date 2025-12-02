import "@testing-library/jest-dom/vitest";
import { vi, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Mock matchMedia for Ionic components
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock ResizeObserver
window.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock IntersectionObserver
window.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock pointer events
if (typeof window.PointerEvent === "undefined") {
  class PointerEvent extends MouseEvent {
    constructor(type: string, params: PointerEventInit = {}) {
      super(type, params);
    }
  }
  // @ts-expect-error - Polyfill for JSDOM
  window.PointerEvent = PointerEvent;
}

// Suppress Stencil async errors in test environment
const originalConsoleError = console.error;
console.error = (...args: unknown[]) => {
  const message = args[0];
  if (
    typeof message === "string" &&
    (message.includes("Stencil") || message.includes("includes"))
  ) {
    return;
  }
  originalConsoleError(...args);
};

// Handle unhandled promise rejections from Stencil
window.addEventListener("unhandledrejection", (event) => {
  if (
    event.reason?.message?.includes("includes") ||
    event.reason?.stack?.includes("@stencil")
  ) {
    event.preventDefault();
  }
});

// Initialize Ionic React for testing
import { setupIonicReact } from "@ionic/react";
setupIonicReact({ mode: "ios" });

// Cleanup after each test
afterEach(() => {
  cleanup();
});

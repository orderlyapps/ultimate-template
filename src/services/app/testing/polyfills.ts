/**
 * Polyfills for JSDOM to support Ionic/Stencil web components
 * This file must be loaded before any Ionic imports
 */

// Suppress Stencil unhandled rejections at process level
process.on("unhandledRejection", (reason: Error) => {
  if (
    reason?.message?.includes("includes") ||
    reason?.message?.includes("push") ||
    reason?.stack?.includes("@stencil") ||
    reason?.stack?.includes("@ionic") ||
    reason?.stack?.includes("addStyle")
  ) {
    // Suppress Stencil/Ionic style-related errors in JSDOM
    return;
  }
  // Re-throw other unhandled rejections
  throw reason;
});

// Suppress uncaught exceptions from Ionic/Stencil async operations
process.on("uncaughtException", (error: Error) => {
  if (
    error?.message?.includes("push") ||
    error?.message?.includes("includes") ||
    error?.stack?.includes("@ionic") ||
    error?.stack?.includes("@stencil")
  ) {
    // Suppress Ionic/Stencil async errors in JSDOM
    return;
  }
  throw error;
});

// Mock adoptedStyleSheets for Stencil
if (typeof document !== "undefined" && !document.adoptedStyleSheets) {
  Object.defineProperty(document, "adoptedStyleSheets", {
    value: [],
    writable: true,
    configurable: true,
  });
}

// Mock CSSStyleSheet.replaceSync
if (typeof CSSStyleSheet !== "undefined") {
  if (!CSSStyleSheet.prototype.replaceSync) {
    CSSStyleSheet.prototype.replaceSync = function () {
      // No-op for testing
    };
  }
  if (!CSSStyleSheet.prototype.replace) {
    CSSStyleSheet.prototype.replace = function () {
      return Promise.resolve(this);
    };
  }
}

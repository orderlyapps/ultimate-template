/**
 * Polyfills for JSDOM to support Ionic/Stencil web components
 * This file must be loaded before any Ionic imports
 */

// Suppress Stencil unhandled rejections at process level
process.on("unhandledRejection", (reason: Error) => {
  if (
    reason?.message?.includes("includes") ||
    reason?.stack?.includes("@stencil") ||
    reason?.stack?.includes("addStyle")
  ) {
    // Suppress Stencil style-related errors in JSDOM
    return;
  }
  // Re-throw other unhandled rejections
  throw reason;
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
    CSSStyleSheet.prototype.replaceSync = function (_text: string) {
      // No-op for testing
    };
  }
  if (!CSSStyleSheet.prototype.replace) {
    CSSStyleSheet.prototype.replace = function (_text: string) {
      return Promise.resolve(this);
    };
  }
}

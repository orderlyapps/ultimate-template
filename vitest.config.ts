import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      devOptions: {
        enabled: true,
      },
      registerType: "prompt",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],
      manifest: {
        name: "My Awesome App",
        short_name: "MyApp",
        description: "My Awesome App description",
        theme_color: "#ffffff",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: [
      "./src/services/app/testing/polyfills.ts",
      "./src/services/app/testing/setup.ts",
    ],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    coverage: {
      reporter: ["text", "json", "html"],
      exclude: ["node_modules/", "src/feature/testing/"],
    },
    deps: {
      optimizer: {
        web: {
          // Exclude Stencil from optimization to avoid initialization issues
          exclude: ["@ionic/core"],
        },
      },
    },
    environmentOptions: {
      jsdom: {
        resources: "usable",
      },
    },
    // Suppress Stencil async style errors
    onConsoleLog(log) {
      if (log.includes("includes") || log.includes("Stencil")) {
        return false;
      }
      return true;
    },
  },
  resolve: {
    alias: {
      // FEATURES
      "@feature": resolve(__dirname, "src/feature"),
      "@testing": resolve(__dirname, "src/feature/testing"),

      // ROUTES
      "@pages": resolve(__dirname, "src/routes/pages"),
      "@home": resolve(__dirname, "src/routes/pages/home"),
      "@settings": resolve(__dirname, "src/routes/pages/settings"),

      "@tabs": resolve(__dirname, "src/routes/tabs"),
      "@routes": resolve(__dirname, "src/routes"),

      // SERVICES
      "@tanstack-query": resolve(
        __dirname,
        "src/services/state/tanstack/query"
      ),
      "@tanstack-db": resolve(__dirname, "src/services/state/tanstack/db"),

      "@supabase/auth": resolve(__dirname, "src/services/state/supabase/auth"),
      "@supabase-db": resolve(__dirname, "src/services/state/supabase"),
      "@zustand": resolve(__dirname, "src/services/state/zustand"),
      "@state": resolve(__dirname, "src/services/state"),

      "@docx": resolve(__dirname, "src/services/docx"),
      "@map": resolve(__dirname, "src/services/map"),
      "@pdf": resolve(__dirname, "src/services/pdf"),
      "@types": resolve(__dirname, "src/services/types"),

      "@services": resolve(__dirname, "src/services"),

      // UI
      "@icons": resolve(__dirname, "src/ui/assets/icons"),
      "@assets": resolve(__dirname, "src/ui/assets"),
      "@colors": resolve(__dirname, "src/ui/colors"),

      "@layout": resolve(__dirname, "src/ui/components/custom/layout"),
      "@input": resolve(__dirname, "src/ui/components/custom/input"),
      "@display": resolve(__dirname, "src/ui/components/custom/display"),
      "@navigation": resolve(__dirname, "src/ui/components/custom/navigation"),

      "@ionic-layout": resolve(__dirname, "src/ui/components/ionic/layout"),
      "@ionic-input": resolve(__dirname, "src/ui/components/ionic/input"),
      "@ionic-display": resolve(__dirname, "src/ui/components/ionic/display"),
      "@ionic-navigation": resolve(
        __dirname,
        "src/ui/components/ionic/navigation"
      ),

      "@components": resolve(__dirname, "src/ui/components"),

      "@css": resolve(__dirname, "src/ui/css"),

      "@ui": resolve(__dirname, "src/ui"),

      // UTIL
      "@constants": resolve(__dirname, "src/util/constants"),
      "@date": resolve(__dirname, "src/util/date"),
      "@filter": resolve(__dirname, "src/util/filter"),
      "@format": resolve(__dirname, "src/util/format"),
      "@sort": resolve(__dirname, "src/util/sort"),
      "@util": resolve(__dirname, "src/util"),

      "@": resolve(__dirname, "src"),
    },
  },
});

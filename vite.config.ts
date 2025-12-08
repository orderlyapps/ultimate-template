import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
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

      "@supabase": resolve(__dirname, "src/services/state/supabase"),
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

  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "assets/pwa/favicon-196.png",
        "assets/pwa/apple-icon-180.png",
        "assets/pwa/logo.svg",
      ],
      manifest: {
        name: "Ultimate Template",
        short_name: "Ultimate",
        background_color: "#4a6da7",
        theme_color: "#4a6da7",
        icons: [
          {
            src: "assets/pwa/manifest-icon-192.maskable.png",
            sizes: "192x192",
            type: "image/png",
          },

          {
            src: "assets/pwa/manifest-icon-512.maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
});

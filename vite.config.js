import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import tailwindcss from "@tailwindcss/vite";
import Sitemap from "vite-plugin-sitemap";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "prompt",
      manifest: {
        id: "/",
        name: "SSN App",
        short_name: "SSNApp",
        description: "Clinic registration and management",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#0190CC",
        icons: [
          {
            src: "ssn-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "ssn-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
        ],
      },
    }),
    Sitemap({
      hostname: "https://ssn-kamala.netlify.app",
      routes: ["/", "/login", "/registerClinic", "/registerClinic/success"],
    }),
  ],
});

import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  nitro: true,
  builds: [
    {
      src: "package.json",
      use: "@vercel/static-build",
      config: {
        distDir: "dist/client",
      },
    },
  ],
  routes: [
    {
      src: "/(.*)",
      dest: "/index.html",
    },
  ],
});

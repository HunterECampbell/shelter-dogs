import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          [
            "babel-plugin-styled-components",
            {
              displayName: true,
            },
          ],
        ],
      },
    }),
    svgr({ svgrOptions: { memo: true }, include: "**/*.svg?react" }),
  ],
  server: {
    port: 9000,
  },
  base: "/shelter-dogs/",
});

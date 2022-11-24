import { defineConfig, loadEnv } from "vite";
import path from "path";

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd());
  process.env = { ...process.env, ...env };
  return {
    root: path.resolve(__dirname, "src"),
    build: {
      outDir: path.resolve(__dirname, "dist"),
      rollupOptions: {
        input: {
          index: path.resolve(__dirname, "src/index.html"),
          contacto: path.resolve(__dirname, "src/contacto.html"),
        },
      },
    },
  };
});

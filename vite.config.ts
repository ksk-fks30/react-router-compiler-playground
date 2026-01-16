import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import babel from "@babel/core";
import type { Plugin } from "vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

function reactCompiler(): Plugin {
  return {
    name: "react-compiler",
    enforce: "pre",
    async transform(code: string, id: string) {
      if (id.includes("/node_modules/")) return;
      const [filepath] = id.split("?");
      if (!/\.[jt]sx?$/.test(filepath)) return;
      const result = await babel.transformAsync(code, {
        babelrc: false,
        configFile: false,
        filename: filepath,
        sourceFileName: filepath,
        presets: [["@babel/preset-typescript", { isTSX: true, allExtensions: true }]],
        plugins: ["babel-plugin-react-compiler"],
        sourceMaps: true,
      });
      if (!result || !result.code) return;
      return { code: result.code, map: result.map };
    },
  };
}

export default defineConfig({
  plugins: [
    reactCompiler(),
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
  ],
  esbuild: {
    target: "es2022",
  },
  optimizeDeps: {
    esbuildOptions: {
      target: "es2022",
    },
  },
});

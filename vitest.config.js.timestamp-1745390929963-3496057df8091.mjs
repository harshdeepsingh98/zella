// vitest.config.js
import { defineConfig } from "file:///C:/Users/Harshdeep/Desktop/zella/node_modules/vitest/dist/config.js";
import react from "file:///C:/Users/Harshdeep/Desktop/zella/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "C:\\Users\\Harshdeep\\Desktop\\zella";
var vitest_config_default = defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.js",
    include: [
      "**/*.test.{js,jsx}",
      "**/*.spec.{js,jsx}",
      "**/*.integration.test.{js,jsx}",
      "**/*.snapshot.test.{js,jsx}"
    ],
    coverage: {
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "src/test/setup.js",
        "**/*.d.ts",
        "**/*.config.{js,ts}",
        "**/index.{js,ts,jsx,tsx}"
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80
      }
    },
    mockReset: true,
    restoreMocks: true,
    clearMocks: true,
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src"),
      "@components": path.resolve(__vite_injected_original_dirname, "./src/components"),
      "@hooks": path.resolve(__vite_injected_original_dirname, "./src/hooks"),
      "@services": path.resolve(__vite_injected_original_dirname, "./src/services"),
      "@store": path.resolve(__vite_injected_original_dirname, "./src/store"),
      "@styles": path.resolve(__vite_injected_original_dirname, "./src/styles"),
      "@utils": path.resolve(__vite_injected_original_dirname, "./src/utils"),
      "@features": path.resolve(__vite_injected_original_dirname, "./src/features"),
      "@pages": path.resolve(__vite_injected_original_dirname, "./src/pages"),
      "@assets": path.resolve(__vite_injected_original_dirname, "./src/assets")
    }
  }
});
export {
  vitest_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZXN0LmNvbmZpZy5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXEhhcnNoZGVlcFxcXFxEZXNrdG9wXFxcXHplbGxhXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxIYXJzaGRlZXBcXFxcRGVza3RvcFxcXFx6ZWxsYVxcXFx2aXRlc3QuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9IYXJzaGRlZXAvRGVza3RvcC96ZWxsYS92aXRlc3QuY29uZmlnLmpzXCI7Ly8gdml0ZXN0LmNvbmZpZy5qc1xyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlc3QvY29uZmlnJztcclxuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0JztcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFtyZWFjdCgpXSxcclxuICB0ZXN0OiB7XHJcbiAgICBnbG9iYWxzOiB0cnVlLFxyXG4gICAgZW52aXJvbm1lbnQ6ICdqc2RvbScsXHJcbiAgICBzZXR1cEZpbGVzOiAnLi9zcmMvdGVzdC9zZXR1cC5qcycsXHJcbiAgICBpbmNsdWRlOiBbXHJcbiAgICAgICcqKi8qLnRlc3Que2pzLGpzeH0nLFxyXG4gICAgICAnKiovKi5zcGVjLntqcyxqc3h9JyxcclxuICAgICAgJyoqLyouaW50ZWdyYXRpb24udGVzdC57anMsanN4fScsXHJcbiAgICAgICcqKi8qLnNuYXBzaG90LnRlc3Que2pzLGpzeH0nLFxyXG4gICAgXSxcclxuICAgIGNvdmVyYWdlOiB7XHJcbiAgICAgIHJlcG9ydGVyOiBbJ3RleHQnLCAnanNvbicsICdodG1sJ10sXHJcbiAgICAgIGV4Y2x1ZGU6IFtcclxuICAgICAgICAnbm9kZV9tb2R1bGVzLycsXHJcbiAgICAgICAgJ3NyYy90ZXN0L3NldHVwLmpzJyxcclxuICAgICAgICAnKiovKi5kLnRzJyxcclxuICAgICAgICAnKiovKi5jb25maWcue2pzLHRzfScsXHJcbiAgICAgICAgJyoqL2luZGV4Lntqcyx0cyxqc3gsdHN4fScsXHJcbiAgICAgIF0sXHJcbiAgICAgIHRocmVzaG9sZHM6IHtcclxuICAgICAgICBsaW5lczogODAsXHJcbiAgICAgICAgZnVuY3Rpb25zOiA4MCxcclxuICAgICAgICBicmFuY2hlczogODAsXHJcbiAgICAgICAgc3RhdGVtZW50czogODAsXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgbW9ja1Jlc2V0OiB0cnVlLFxyXG4gICAgcmVzdG9yZU1vY2tzOiB0cnVlLFxyXG4gICAgY2xlYXJNb2NrczogdHJ1ZSxcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgICdAJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjJyksXHJcbiAgICAgICdAY29tcG9uZW50cyc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy9jb21wb25lbnRzJyksXHJcbiAgICAgICdAaG9va3MnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvaG9va3MnKSxcclxuICAgICAgJ0BzZXJ2aWNlcyc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy9zZXJ2aWNlcycpLFxyXG4gICAgICAnQHN0b3JlJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL3N0b3JlJyksXHJcbiAgICAgICdAc3R5bGVzJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL3N0eWxlcycpLFxyXG4gICAgICAnQHV0aWxzJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL3V0aWxzJyksXHJcbiAgICAgICdAZmVhdHVyZXMnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvZmVhdHVyZXMnKSxcclxuICAgICAgJ0BwYWdlcyc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy9wYWdlcycpLFxyXG4gICAgICAnQGFzc2V0cyc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy9hc3NldHMnKSxcclxuICAgIH0sXHJcbiAgfSxcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFDQSxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFdBQVc7QUFDbEIsT0FBTyxVQUFVO0FBSGpCLElBQU0sbUNBQW1DO0FBS3pDLElBQU8sd0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQSxFQUNqQixNQUFNO0FBQUEsSUFDSixTQUFTO0FBQUEsSUFDVCxhQUFhO0FBQUEsSUFDYixZQUFZO0FBQUEsSUFDWixTQUFTO0FBQUEsTUFDUDtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxJQUNBLFVBQVU7QUFBQSxNQUNSLFVBQVUsQ0FBQyxRQUFRLFFBQVEsTUFBTTtBQUFBLE1BQ2pDLFNBQVM7QUFBQSxRQUNQO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFBQSxNQUNBLFlBQVk7QUFBQSxRQUNWLE9BQU87QUFBQSxRQUNQLFdBQVc7QUFBQSxRQUNYLFVBQVU7QUFBQSxRQUNWLFlBQVk7QUFBQSxNQUNkO0FBQUEsSUFDRjtBQUFBLElBQ0EsV0FBVztBQUFBLElBQ1gsY0FBYztBQUFBLElBQ2QsWUFBWTtBQUFBLElBQ1osT0FBTztBQUFBLE1BQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLE1BQ3BDLGVBQWUsS0FBSyxRQUFRLGtDQUFXLGtCQUFrQjtBQUFBLE1BQ3pELFVBQVUsS0FBSyxRQUFRLGtDQUFXLGFBQWE7QUFBQSxNQUMvQyxhQUFhLEtBQUssUUFBUSxrQ0FBVyxnQkFBZ0I7QUFBQSxNQUNyRCxVQUFVLEtBQUssUUFBUSxrQ0FBVyxhQUFhO0FBQUEsTUFDL0MsV0FBVyxLQUFLLFFBQVEsa0NBQVcsY0FBYztBQUFBLE1BQ2pELFVBQVUsS0FBSyxRQUFRLGtDQUFXLGFBQWE7QUFBQSxNQUMvQyxhQUFhLEtBQUssUUFBUSxrQ0FBVyxnQkFBZ0I7QUFBQSxNQUNyRCxVQUFVLEtBQUssUUFBUSxrQ0FBVyxhQUFhO0FBQUEsTUFDL0MsV0FBVyxLQUFLLFFBQVEsa0NBQVcsY0FBYztBQUFBLElBQ25EO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==

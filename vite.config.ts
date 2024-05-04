import { defineConfig, UserConfigExport, ConfigEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import { viteMockServe } from "vite-plugin-mock";
import IconsResolver from "unplugin-icons/resolver";
// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    //scss全局变量配置
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";',
        },
      },
    },
    plugins: [
      vue(),
      viteMockServe({
        enable: command === "serve",
      }),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        // Specify symbolId format
        symbolId: "icon-[dir]-[name]",
      }),
      AutoImport({
        dts: "src/types/auto-imports.d.ts",
        imports: ["vue-router", "vue", "pinia"],
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            prefix: "Icon",
          }),
        ],
      }),
      Components({
        dts: "src/types/components.d.ts",
        // dirs: ["src/components"],
        resolvers: [
          ElementPlusResolver(),
          // Auto register icon components
          // 自动注册图标组件
          IconsResolver({
            enabledCollections: ["ep"],
          }),
        ],
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"), // 相对路径别名配置，使用 @ 代替 src
      },
    },
  };
});

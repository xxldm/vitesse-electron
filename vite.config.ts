import VueI18n from "@intlify/vite-plugin-vue-i18n";
import Vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import Unocss from "unocss/vite";
import AutoImport from "unplugin-auto-import/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import { type ConfigEnv, type Plugin, type UserConfig, type UserConfigExport, loadEnv } from "vite";
import electron from "vite-plugin-electron";
import Pages from "vite-plugin-pages";
import { VitePWA } from "vite-plugin-pwa";
import Layouts from "vite-plugin-vue-layouts";

export default ({ mode }: ConfigEnv): UserConfigExport => {
  const env = loadEnv(mode, __dirname, ["VSCODE_"]);
  const isDebug = env.VSCODE_DEBUG !== undefined;
  return {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: "@use \"~/styles/element-variables.scss\" as *;",
        },
      },
    },
    resolve: {
      alias: {
        "~/": `${resolve(__dirname, "src")}/`,
      },
    },
    plugins: [
      Vue({
        reactivityTransform: true,
      }),
      electron({
        main: {
          entry: "electron/main/index.ts",
          vite: withDebug(isDebug, {
            build: {
              outDir: "dist/electron/main",
            },
          }),
        },
      }),

      // https://github.com/hannoeru/vite-plugin-pages
      Pages(),

      Layouts(),

      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        imports: [
          "vue",
          "vue-router",
          "vue-i18n",
          "vue/macros",
          "vitest",
          "pinia",
          "@vueuse/core",
          "@vueuse/head",
          {
            "axios": [
              ["default", "axios"],
            ],
            "@vueuse/integrations/useNProgress": [
              ["useNProgress", "useNProgress"],
            ],
            "@vueuse/integrations/useAxios": [
              ["useAxios", "useAxios"],
            ],
            "@vueuse/router": [
              ["useRouteHash", "useRouteHash"],
              ["useRouteParams", "useRouteParams"],
              ["useRouteQuery", "useRouteQuery"],
            ],
          },
        ],
        dts: true,
        dirs: [
          "src/composables",
          "src/store",
        ],
        vueTemplate: true,
        // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
        resolvers: [ElementPlusResolver()],
      }),

      // https://github.com/antfu/vite-plugin-components
      Components({
        dirs: ["src/components", "src/layouts/components"],
        dts: true,
        resolvers: [
          ElementPlusResolver({ importStyle: "sass" }),
        ],
      }),

      // https://github.com/antfu/unocss
      // see unocss.config.ts for config
      Unocss(),

      // https://github.com/antfu/vite-plugin-pwa
      VitePWA({
        registerType: "autoUpdate",
        includeAssets: ["favicon.svg", "safari-pinned-tab.svg"],
        manifest: {
          name: "Vitesse",
          short_name: "Vitesse",
          theme_color: "#ffffff",
          icons: [
            {
              src: "./favicon-192x192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "./favicon-512x512.png",
              sizes: "512x512",
              type: "image/png",
            },
            {
              src: "./favicon-512x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "any maskable",
            },
          ],
        },
      }),

      // https://github.com/intlify/bundle-tools/tree/main/packages/vite-plugin-vue-i18n
      VueI18n({
        runtimeOnly: true,
        compositionOnly: true,
        include: [resolve(__dirname, "locales/**")],
      }),
    ],
    // https://github.com/vitest-dev/vitest
    test: {
      environment: "jsdom",
    },
    build: {
      emptyOutDir: true,
      // 被 electron 插件覆盖了?,不设置会打包到dist根目录
      assetsDir: "assets",
    },
  };
};

/* function MyElectron(config: { isDebug: boolean; electron: Configuration }) {
  let plugins = electron(config.electron);
  if (config.isDebug) {
    plugins = plugins.filter(plugin => plugin.name !== "electron-main-watcher");
  }
  return plugins;
} */

function withDebug(isDebug: boolean, config: UserConfig): UserConfig {
  if (isDebug) {
    if (!config.build) {
      config.build = {};
    }

    config.build.sourcemap = true;
    // 添加一个插件,用来去除 electron-main-watcher 插件
    // 避免调试的时候自动打开 VSCode 未捕获的窗口
    config.plugins = (config.plugins || []).concat({
      name: "electron-vite-debug",
      configResolved(config) {
        const index = config.plugins.findIndex(p => p.name === "electron-main-watcher");
        (config.plugins as Plugin[]).splice(index, 1);
      },
    });
  }
  return config;
}


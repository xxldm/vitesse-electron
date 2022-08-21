import VueI18n from "@intlify/vite-plugin-vue-i18n";
import Vue from "@vitejs/plugin-vue";
import path from "path";
import Unocss from "unocss/vite";
import AutoImport from "unplugin-auto-import/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import { defineConfig } from "vite";
import Pages from "vite-plugin-pages";
import { VitePWA } from "vite-plugin-pwa";
import Layouts from "vite-plugin-vue-layouts";

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: "@use \"~/styles/element-variables.scss\" as *;",
      },
    },
  },
  resolve: {
    alias: {
      "~/": `${path.resolve(__dirname, "src")}/`,
    },
  },
  plugins: [
    Vue({
      reactivityTransform: true,
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
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
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
      include: [path.resolve(__dirname, "locales/**")],
    }),
  ],
  // https://github.com/vitest-dev/vitest
  test: {
    environment: "jsdom",
  },
});

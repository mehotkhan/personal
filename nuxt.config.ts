import Icons from "unplugin-icons/vite";
import Components from "unplugin-vue-components/vite";
import viteCompression from "vite-plugin-compression";
import IconsResolver from "unplugin-icons/resolver";
import { viteCommonjs } from "@originjs/vite-plugin-commonjs";

import { GenerateRoutes } from "./tools/contentRoutes";

export default defineNuxtConfig({
  app: {
    head: {
      titleTemplate: "%s - علی زِمانی://طراح و توسعه دهنده وب",
      meta: [
        {
          name: "fontiran.com:license",
          content: "7RP38A",
        },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "theme-color", content: "#e5e7eb" },
        {
          hid: "description",
          name: "description",
          content: "یادداشت های پراکنده از یک تکنولوژیست جوان و خردمند",
        },
      ],

      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: "icon",
          type: "image/png",
          sizes: "192x192",
          href: "/icons/android-chrome-192x192.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "512x512",
          href: "/icons/android-chrome-512x512.png",
        },
        {
          rel: "icon",
          type: "apple-touch-icon",
          sizes: "256x256",
          href: "/icons/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/icons/android-chrome-16x16.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/icons/android-chrome-192x192.png",
        },
      ],
    },
    pageTransition: { name: "page", mode: "out-in" },
  },
  css: ["@/assets/scss/base.scss"],
  modules: [
    "unplugin-icons/nuxt",
    "@nuxt/image",
    "@nuxthq/ui",
    "@nuxt/content",
    "@vueuse/nuxt",
    "nuxt-gtag",
    "@nuxtjs/turnstile",
    "@vueuse/nuxt",
  ],
  vite: {
    optimizeDeps: {
      include: ["@editorjs/editorjs"],
    },
    plugins: [
      viteCompression({ algorithm: "brotliCompress" }),
      Components({
        resolvers: [
          IconsResolver({
            prefix: "Icon",
          }),
        ],
      }),
      Icons(),
      viteCommonjs(),
    ],
    build: {
      watch: {},
      sourcemap: false,
      minify: true,
      rollupOptions: { treeshake: false },
    },
  },

  typescript: {
    strict: true,
    typeCheck: false,
  },
  nitro: {
    compressPublicAssets: true,
    prerender: {
      crawlLinks: false,
      routes: GenerateRoutes(["notes"]),
    },
  },
  experimental: {
    payloadExtraction: false,
    treeshakeClientOnly: false,
  },
  gtag: {
    id: "G-78646PGVN1",
  },
  turnstile: {
    siteKey: "0x4AAAAAAAB-JPOdcz31l5yM",
  },
  // routeRules: {
  //   // Static page generated on-demand once
  //   "/**": { static: true },
  //   // Render these routes with SPA
  //   "/auth/**": { ssr: false },
  //   "/dash/**": { ssr: false },
  //   "/social/**": { ssr: false },
  // },
  // pwa: {
  //   registerType: 'autoUpdate',
  //   workbox: {
  //     navigateFallback: '/',
  //     globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
  //   },
  //   client: {
  //     installPrompt: true,
  //     // you don't need to include this: only for testing purposes
  //     // if enabling periodic sync for update use 1 hour or so (periodicSyncForUpdates: 3600)
  //     periodicSyncForUpdates: 20,
  //   },
  //   devOptions: {
  //     enabled: true,
  //     suppressWarnings: true,
  //     navigateFallbackAllowlist: [/^\/$/],
  //     type: 'module',
  //   },
  // },
});

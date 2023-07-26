import Icons from "unplugin-icons/vite";
import Components from "unplugin-vue-components/vite";
import IconsResolver from "unplugin-icons/resolver";
import { GenerateRoutes } from "./tools/contentRoutes";

export default defineNuxtConfig({
  // ssr: true,
  // target: "static",
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
  ],
  vite: {
    plugins: [
      Components({
        resolvers: [
          IconsResolver({
            prefix: "Icon",
          }),
        ],
      }),
      Icons(),
    ],
    build: {
      watch: {},
      sourcemap: false,
      minify: true,
      cleanCssOptions: { sourceMap: false },
      rollupOptions: { treeshake: false },
    },
  },

  typescript: {
    strict: true,
    typeCheck: false,
  },
  nitro: {
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
});

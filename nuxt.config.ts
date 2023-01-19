import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import Components from "unplugin-vue-components/vite";
export default defineNuxtConfig({
  ssr: false,
  target: "static",

  css: [
    "virtual:windi-base.css",
    "virtual:windi-components.css",
    "virtual:windi-utilities.css",
    "@/assets/scss/base.scss",
  ],
  build: {
    transpile: ["@headlessui/vue"],
  },
  modules: [
    "unplugin-icons/nuxt",
    "nuxt-windicss",
    "@nuxt/content",
    "@vueuse/nuxt",
    "@pinia/nuxt",
    "@nuxtjs/turnstile",
  ],
  components: true,

  app: {
    // global transition
    pageTransition: { name: "page", mode: "in-out" },
    // layoutTransition: { name: 'layout', mode: 'out-in' },
  },
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
  },
  vueuse: {
    ssrHandlers: false,
  },

  // content
  content: {
    documentDriven: true,
    experimental: {
      clientDB: true,
      stripQueryParameters: true,
    },
    markdown: {
      mdc: true,
    },
    highlight: {
      theme: "github-light",
    },
  },
  typescript: {
    strict: true,
    typeCheck: false,
  },
  turnstile: {
    siteKey: "0x4AAAAAAAB-JPOdcz31l5yM",
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/", "/notes", "/notes/self-learning-physics"],
    },
  },
  experimental: {
    reactivityTransform: false,
    payloadExtraction: false,
    treeshakeClientOnly: false,
  },
});

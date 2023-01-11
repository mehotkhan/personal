import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import Components from "unplugin-vue-components/vite";
export default defineNuxtConfig({
  ssr: false,
  target: "static",

  css: ["@/assets/scss/base.scss"],
  build: {
    transpile: ["@headlessui/vue"],
  },
  modules: [
    "unplugin-icons/nuxt",
    "nuxt-windicss",
    "@nuxt/content",
    "@vueuse/nuxt",
  ],
  components: true,
  router: {
    prefetchLinks: true,
  },

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
    documentDriven: false,
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
});

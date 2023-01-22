import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import Components from "unplugin-vue-components/vite";
import fs from "fs";

const GenerateContentPaths = (path: string, files_: string[] = []) => {
  files_ = files_ || [];
  const files = fs.readdirSync(path);
  for (var i in files) {
    var name = path + "/" + files[i];
    if (fs.statSync(name).isDirectory()) {
      GenerateContentPaths(name, files_);
    } else {
      files_.push(name.replace("content", "").replace(".md", ""));
    }
  }
  return files_;
};

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
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
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
      routes: [
        ...GenerateContentPaths("content/notes"),
        ...GenerateContentPaths("content/market"),
      ],
    },
  },
  experimental: {
    reactivityTransform: false,
    payloadExtraction: false,
    treeshakeClientOnly: false,
  },
});

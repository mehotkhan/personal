import fs from "fs";
import WindiCSS from "vite-plugin-windicss";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import Components from "unplugin-vue-components/vite";

const GenerateContentPaths = (path: string, files_: string[] = []) => {
  files_ = files_ || [];
  const files = fs.readdirSync(path);
  for (const i in files) {
    const name = path + "/" + files[i];
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
  // target: "static",

  css: [
    "virtual:windi.css",
    "virtual:windi-devtools",
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
    "@kevinmarrec/nuxt-pwa",
  ],
  components: true,

  // app: {
  //   // global transition
  //   pageTransition: { name: "page", mode: "out-in" },
  //   layoutTransition: { name: "layout", mode: "out-in" },
  // },
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
      WindiCSS({
        transformGroups: false,
      }),
    ],
  },
  vueuse: {
    ssrHandlers: false,
  },

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
  routeRules: {
    // Static page generated on-demand, revalidates in background
    "/contact/**": { swr: true },
    // Static page generated on-demand once
    "/notes/**": { static: true },
  },
  pwa: {
    workbox: {
      enabled: true,
      templatePath: "~/assets/sw.js",
      workboxUrl: `/workbox/workbox-sw.js?${Date.now()}`,
    },
    meta: {
      name: "علـی زِمـــانی :// توسعه دهنده وب",
      author: "mehotkhan",
      description: "یادداشت های پراکنده از یک تکنولوژیست جوان و خردمند",
      lang: "fa",
    },
    manifest: {
      name: "علـی زِمـــانی",
      short_name: "aliZemani.ir",
      theme_color: "#E5E7EB",
      background_color: "#ffffff",
      start_url: "https://alizemani.ir/?source=pwa",
      display: "standalone",
      lang: "fa",
    },
  },
});

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
      lang: "fa",
    },
    manifest: {
      name: "علـی زِمـــانی",
      short_name: "aliZemani.ir",
      theme_color: "#e5e7eb",
      background_color: "#e5e7eb",
      start_url: "https://alizemani.ir/?source=pwa",
      display: "standalone",
      lang: "fa",
    },
  },
});

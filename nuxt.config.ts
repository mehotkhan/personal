export default defineNuxtConfig({
  css: ["@/assets/scss/base.scss"],
  // ssr: false,
  target: "static", // default is 'server'
  modules: ["nuxt-windicss", "@nuxt/content"],
});

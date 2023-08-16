import CKeditor from "../components/CKeditor.vue";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("ck-editor", CKeditor);
});

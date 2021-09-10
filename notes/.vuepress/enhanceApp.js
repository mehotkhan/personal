/**
 * Client app enhancement file.
 *
 * https://v1.vuepress.vuejs.org/guide/basic-config.html#app-level-enhancements
 */
import AvLine from "../../node_modules/vue-audio-visual/src/components/AvLine";
import { register } from "register-service-worker";

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData, // site metadata
}) => {
  // browsers compatibility
  if (typeof window !== "undefined") window.global = window;
  const Gun = require("gun/gun");
  const VueGun = require("vue-gun");
  const SEA = require("gun/sea");
  Vue.use(VueGun, {
    gun: Gun(["https://gundb.alizemani.ir/gun"]), // must be passed in at `gun` key
    peers: ["https://gundb.alizemani.ir/gun"],
  });
  Vue.component(AvLine.name, AvLine);
  register("/sw.js", {
    registrationOptions: { scope: "./" },
    ready(registration) {
      console.log("Service worker is active.");
    },
    registered(registration) {
      console.log("Service worker has been registered.");
    },
    cached(registration) {
      console.log("Content has been cached for offline use.");
    },
    updatefound(registration) {
      console.log("New content is downloading.");
    },
    updated(registration) {
      console.log("New content is available; please refresh.");
    },
    offline() {
      console.log(
        "No internet connection found. App is running in offline mode."
      );
    },
    error(error) {
      console.error("Error during service worker registration:", error);
    },
  });
};

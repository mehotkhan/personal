/**
 * Client app enhancement file.
 *
 * https://v1.vuepress.vuejs.org/guide/basic-config.html#app-level-enhancements
 */

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData // site metadata
}) => {
  if (typeof window !== "undefined") window.global = window;
  const Gun = require("gun/gun");
  const VueGun = require("vue-gun");
  const SEA = require("gun/sea");
  Vue.use(VueGun, {
    gun: Gun(["https://gundb.alizemani.ir/gun"]), // must be passed in at `gun` key
    peers: ['https://gundb.alizemani.ir/gun']
});
  // ...apply enhancements for the site.
}

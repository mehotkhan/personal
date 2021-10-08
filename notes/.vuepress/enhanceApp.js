import AvWaveform from "../../node_modules/vue-audio-visual/src/components/AvWaveform";
import("uikit/dist/css/uikit-rtl.css");

if (typeof window !== "undefined") window.global = window;
require("gun/gun.js");
const SEA = require("gun/sea.js");

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData, // site metadata
}) => {
  const VueGun = require("vue-gun");

  Vue.use(VueGun, {
    gun: Gun(["https://gundb.alizemani.ir/gun"]),
  });
  Vue.component(AvWaveform.name, AvWaveform);
  Vue.mixin({
    beforeMount() {
      const UIkit = require("uikit");
      const Icons = require("uikit/dist/js/uikit-icons");
      UIkit.use(Icons);
      window.UIkit = UIkit;
    },
  });
};

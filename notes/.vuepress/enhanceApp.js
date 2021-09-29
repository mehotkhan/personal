import AvLine from "../../node_modules/vue-audio-visual/src/components/AvLine";
import { register } from "register-service-worker";

import("uikit/dist/css/uikit-rtl.css");
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

  Vue.mixin({
    beforeMount() {
      const UIkit = require("uikit");
      const Icons = require("uikit/dist/js/uikit-icons");
      UIkit.use(Icons);
      window.UIkit = UIkit;
    },
  });
};

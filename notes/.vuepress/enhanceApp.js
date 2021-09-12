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

  Vue.mixin({
    data: () => ({
      sendNewMessage: true,
      lastMessage: null,
    }),
    mounted: function() {
      const nowTime = Date.now();
      let self = this;
      this.$gun
        .get("test-notifications-test6")
        .map((notif) => {
          if (nowTime - notif.date < 500) {
            return notif;
          }
          return;
        })
        .on(this.sendNotify);
    },
    methods: {
      sendNotify(notif) {
        console.log(this.lastMessage);
        // console.log(typeof notif.date);
        // console.log(typeof this.lastMessage);
        if (
          this.lastMessage !== null &&
          this.lastMessage !== Number(notif.date)
        ) {
          console.log("say hello");

          // console.log(notif);
          this.lastMessage = null;
        } else {
          this.lastMessage = Number(notif.date);
        }
        // if (!this.sendNewMessage) {
        // this.newMessage.push(notif);
        // setTimeout(function() {
        // console.log("ding");
        // this.sendNewMessage = true;
        // }, 1000);
        // }
        // notif.set({
        //   send: false,
        // });
        // console.log(notif);
        //   // navigator.serviceWorker.ready.then(function(serviceWorker) {
        //   //   serviceWorker.showNotification(notif.title, notif.options);
        //   // });
      },
    },
  });

  if ("serviceWorker" in navigator && "PushManager" in window) {
    console.log("Service Worker and Push are supported");
    var prm = Notification.permission;
    if (prm == "default" || prm == "denied") {
      console.log("permission denied or default");
      Notification.requestPermission().then(function(permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          var notification = new Notification("Hi there!");
        }
      });
    } else {
      console.log("permission granted");
    }
    console.log(options.$gun);

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
  } else {
    console.warn("Push messaging is not supported");
  }
};

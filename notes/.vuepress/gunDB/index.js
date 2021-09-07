if (typeof window !== "undefined") window.global = window;

const Gun = require("gun/gun");
const SEA = require("gun/sea");

export default {
  mounted() {
    this.$vuepress.gun = Gun(["https://gundb.alizemani.ir/gun"]);
    this.$vuepress.user = this.$vuepress.gun
      .user()
      .recall({ sessionStorage: true });
    // console.log(this.$gun)
  },
};

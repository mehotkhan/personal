
<template>
  <div>
    <hr />
    <div class="uk-alert-allert" uk-alert v-if="userAllert">
      <a class="uk-alert-close" uk-close></a>
      <p>{{ userAllert }}</p>
    </div>
    <div class="uk-margin">
      <textarea
        v-model="comment"
        :disabled="!loggedIN"
        class="uk-textarea"
        rows="3"
        placeholder="نظر شما"
      ></textarea>
    </div>
    <div class="uk-width-1-1@s">
      <button
        :disabled="!loggedIN || !comment"
        class="
          uk-button
          uk-button-small
          uk-button-text
          uk-width-1-1
          uk-padding-remove-horizontal
        "
        @click="sendComment"
      >
        ارسال دیدگاه
      </button>
    </div>
    <hr />
    <ul class="uk-list uk-list-hyphen uk-list-divider">
      <li
        v-for="comment in orderBydate"
        class="uk-visible-toggle"
        tabindex="-1"
        v-bind:key="comment.date"
      >
        <p class="uk-text-meta uk-text-small">
          <!-- <span>نام نویسنده </span> -->
          <span> {{ persian_number(persian_date(comment.date)) }} </span>
          <span class="uk-hidden-hover uk-text-right">
            ، کلید عمومی : Qmezm7g8mBpWyuPk6D84CNcfLKJwU6mpXuEN5GJZNkX3XK
          </span>
        </p>
        <p class="uk-text-lead uk-text-default">{{ comment.data }}</p>
        <a
          class="
            uk-text-small
            uk-invisible-hover
            uk-text-meta
            uk-text-small
            uk-text-primary
          "
          >پاسخ به این نظر</a
        >
      </li>
    </ul>
  </div>
</template>

<script>
const moment = require("moment-jalaali");
moment.locale("fa-IR"); // fa
import _ from "lodash";

export default {
  props: ["title"],
  name: "p2pComment",

  mounted() {
    this.user = this.$gun.user();
    if (this.user.is) {
      this.loggedIN = true;
    }
    this.loadComments();
  },
  computed: {
    orderBydate: function () {
      return _.orderBy(this.commentList, "date", ["desc"]);
    },
  },
  data: () => ({
    userDetails: null,
    savedCred: null,
    assertion: null,
    comment: null,
    commentList: [],
    userAllert: null,
    loggedIN: false,
  }),

  methods: {
    async loadComments() {
      var self = this;
      await this.$gun
        .get(this.title)
        .get("comments_")
        .map()
        .once(function (item) {
          self.commentList.push(item);
        });
    },

    async sendComment() {
      let self = this;
      await this.$gun
        .get(this.title)
        .get("comments_")
        .set({ data: this.comment, date: Date.now() }, (cb) => {
          if (cb.ok) {
            self.userAllert = "دیدگاه شما ارسال شد .";
            self.comment = null;
          }
        });
    },
    persian_number(number) {
      let en_number = number.toString();
      let persianDigits = "۰۱۲۳۴۵۶۷۸۹";
      let persianMap = persianDigits.split("");
      let persian_number = en_number.replace(/\d/g, function (m) {
        return persianMap[parseInt(m)];
      });
      return persian_number;
    },
    persian_date(timestamp) {
      return moment(timestamp).fromNow();
    },
  },
};
</script>

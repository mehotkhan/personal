
<template>
  <div>
    <br />
    <div class="uk-alert-allert" uk-alert v-if="this.userAllert">
      <a class="uk-alert-close" uk-close></a>
      <p>{{ this.userAllert }}</p>
    </div>
    <div class="uk-margin">
      <textarea
        v-model="comment"
        :disabled="!this.loggedIN"
        class="uk-textarea"
        rows="3"
        placeholder="نظر شما"
      ></textarea>
    </div>
    <div class="uk-width-1-1@s" :hidden="!this.loggedIN">
      <button
        :disabled="this.loggedIN && !this.comment"
        class="uk-button uk-button-default uk-width-1-1"
        @click="sendComment"
      >
        ارسال دیدگاه
      </button>
    </div>
    <hr />
    <ul class="uk-list uk-list-hyphen uk-list-divider">
      <li
        v-for="comment in commentList"
        class="uk-visible-toggle"
        tabindex="-1"
        v-bind:key="comment.title"
      >
        <p class="uk-text-meta uk-text-small">
          <span>نام نویسنده </span>
          <span class="uk-hidden-hover uk-text-right">
            ، کلید عمومی : Qmezm7g8mBpWyuPk6D84CNcfLKJwU6mpXuEN5GJZNkX3XK
          </span>
        </p>
        <p class="uk-text-lead uk-text-default">{{ comment.text }}</p>
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
export default {
  props: ["title"],
  name: "p2pComment",

  mounted() {
    this.user = this.$gun.user().recall({ sessionStorage: true });
    this.sea = SEA;
    if (this.user.is) {
      this.loggedIN = true;
      const pub = this.user.is.pub;
      let self = this;
      this.$gun.user(pub).once((data, key) => {
        console.log(data);
        console.log(pub);
        self.myAlias = data && data.alias ? data.alias : "none";
        self.myPub = pub ? pub : epub;
      });
    }
    this.loadComments();
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
        .get("comments")
        .map()
        .once(function (item, key) {
          self.commentList.push({
            key: key,
            text: item,
          });
        });
    },

    async sendComment() {
      console.log("hi");
      console.log(this.comment);
      let self = this;
      await this.$gun
        .get(this.title)
        .get("comments")
        .set(this.comment, (cb) => {
          if (cb.ok) {
            self.userAllert = "دیدگاه شما ارسال شد .";
            self.comment = null;
          }
        });
    },
  },
};
</script>

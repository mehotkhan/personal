
<template>
  <div>
    <br />
    <br />
    <h2>دیدگاه های مخاطبان</h2>
    <div class="uk-alert-danger" uk-alert>
      <a class="uk-alert-close" uk-close></a>
      <p>این بخش در حال توسعه است و هنوز قابلیت اجرایی ندارد!!!</p>
    </div>
    <div class="uk-alert-success" uk-alert v-if="savedCred">
      <a class="uk-alert-close" uk-close></a>
      <p>شما با موفقیت عضو شدید</p>
    </div>
    <div class="uk-alert-primary" uk-alert v-if="assertion">
      <a class="uk-alert-close" uk-close></a>
      <p>شما با موفقیت وارد شدید</p>
    </div>

    <div class="uk-grid-small" uk-grid>
      <div class="uk-width-1-2@s">
        <input
          v-model="inputData.username"
          class="uk-input uk-width-1-1"
          type="text"
          placeholder="نام"
        />
      </div>

      <div class="uk-width-1-4@s">
        <button
          uk-icon="sign-in"
          class="uk-button uk-button-default uk-width-1-1"
          :disabled__="!(inputData.username && inputData.emailAddress)"
          @click="register"
        >
          عضویت
        </button>
      </div>
      <div class="uk-width-1-4@s">
        <button
          uk-icon="user"
          class="uk-button uk-button-default uk-width-1-1"
          :disabled__="
            !(inputData.username && inputData.emailAddress && savedCred)
          "
          @click="authenticate"
        >
          ورود
        </button>
      </div>
      <div class="uk-width-1-2@s" :hidden="!(assertion && savedCred)">
        <button
          uk-icon="sign-out"
          class="uk-button uk-button-default"
          :disabled__="!(assertion && savedCred)"
          @click="exit"
        >
          خروج
        </button>
      </div>
    </div>

    <hr />
    <div class="uk-margin">
      <textarea
        v-model="inputData.comment"
        :disabled__="
          !(inputData.username && inputData.emailAddress && assertion)
        "
        class="uk-textarea"
        rows="5"
        placeholder="نظر شما"
      ></textarea>
    </div>
    <p uk-margin>
      <button
        :disabled__="
          !(inputData.username && inputData.emailAddress && assertion)
        "
        class="uk-button uk-button-primary uk-button-large"
        @click="sendComment"
      >
        ارسال دیدگاه
      </button>
    </p>
    <hr />
    <ul class="uk-list uk-list-striped">
      <li v-for="comment in commentList">
        <span class="uk-text-meta uk-text-small">نظر دهنده :</span>
        <span class="uk-text-lead uk-text-default">{{ comment.text }}</span>
        <br />
      </li>
    </ul>
  </div>
</template>

<script>
import * as defaults from "./defaults";
import {
  generateId,
  generateChallenge,
  ab2b64,
  encodeCredential,
  encodeAssertion,
} from "./helpers";

export default {
  // change this!
  props: ["title"],
  name: "p2pComment",
  beforeMount() {
    const UIkit = require("uikit");
    const Icons = require("uikit/dist/js/uikit-icons");
    UIkit.use(Icons);
    window.UIkit = UIkit;
  },
  mounted() {
    if (this.$vuepress.user.is) {
      console.log("user is loged in");
    }
    this.loadComments();
  },

  data: () => ({
    inputData: {
      username: "",
      emailAddress: "",
      relyingParty: {
        name: "Ali Zemani Personal Website",
        id: "alizemani.ir",
      },
      attachment: "any",
      attestation: "none",
    },
    userDetails: null,
    savedCred: null,
    assertion: null,
    comment: null,
    commentList: [],
  }),
  computed: {
    formattedUserDetails() {
      if (!this.$vuepress.userDetails) return null;
      return {
        ...this.$vuepress.userDetails,
        id: ab2b64(this.$vuepress.userDetails.id),
      };
    },
    formattedSavedCred() {
      if (!this.savedCred) return null;
      return encodeCredential(this.savedCred);
    },
    formattedAssertion() {
      if (!this.assertion) return null;
      return encodeAssertion(this.assertion);
    },
  },
  methods: {
    async loadComments() {
      var self = this;
      this.$vuepress.gun
        .get(this.title)
        .get("comments")
        .map()
        .on(function (item, key) {
          self.commentList.push({
            key: key,
            text: item,
          });
        });
      console.log(this.commentList);
    },
    async gunRegister() {
      this.$vuepress.user.create(
        this.inputData.username,
        "custom pass",
        (cb) => {
          console.log(cb);
          console.log("user created");
        }
      );
    },
    async gunAuthenticate() {
      await this.$vuepress.user.auth(
        this.inputData.username,
        "custom pass",
        (cb) => {
          console.log(cb);
          console.log("user loged in");
        }
      );
    },
    async gunExit() {
      const user = this.$vuepress.gun.user();
      user.leave();
    },
    async register() {
      const publicKey = {
        rp: this.inputData.relyingParty,
        pubKeyCredParams: defaults.pubKeyCredParams,
        timeout: 60 * 1000,

        attestation: this.inputData.attestation,

        // This would allow restricting devices to e.g. touchid or u2f key but it doesn't work consistently at the moment (2019-01-20)
        authenticatorSelection:
          this.inputData.attachment === "any"
            ? undefined
            : {
                ...defaults.authenticatorSelection,
                authenticatorAttachment: this.inputData.attachment,
              },

        // cryptographic challenge from server
        challenge: generateChallenge(),

        // user details from server post account creation
        user: {
          id: generateId(),
          name: this.inputData.emailAddress,
          displayName: this.inputData.username,
        },
      };

      console.log({ publicKey });

      // register / create a new credential
      try {
        const cred = await navigator.credentials.create({ publicKey });
        this.savedCred = cred;
        this.$vuepress.userDetails = publicKey.user;
        console.log(`Credential obtained`, this.savedCred);
      } catch (e) {
        console.error(e.message);
      }
    },
    async authenticate() {
      if (!this.savedCred) {
        alert("You must register first");
        return;
      }

      const publicKey = {
        rp: this.inputData.relyingParty,
        pubKeyCredParams: defaults.pubKeyCredParams,
        attestation: defaults.attestation,
        timeout: 60 * 1000,

        // cryptographic challenge from server
        challenge: generateChallenge(),

        allowCredentials: [
          {
            // user's credential id and settings from server
            id: this.savedCred.rawId,
            // transports: defaults.transports,
            type: defaults.credentialType,
          },
        ],
      };

      console.log({ publicKey });

      try {
        const assertion = await navigator.credentials.get({ publicKey });
        console.log(`Assertion obtained`, assertion);
        this.assertion = assertion;
      } catch (e) {
        console.error(e.message);
      }
    },
    async exit() {
      this.assertion = null;
      this.savedCred = null;
    },
    async sendComment() {
      await this.$vuepress.gun
        .get(this.title)
        .get("comments")
        .set(this.inputData.comment);
    },
  },
};
</script>
<style src="uikit/dist/css/uikit-rtl.css"></style>
<style>
h1,
.uk-h1,
h2,
.uk-h2,
h3,
.uk-h3,
h4,
.uk-h4,
h5,
.uk-h5,
h6,
.uk-h6,
.uk-heading-small,
.uk-heading-medium,
.uk-heading-large,
.uk-heading-xlarge,
.uk-heading-2xlarge {
  margin: 0 0 20px 0;
  font-family: inherit !important;
  font-weight: normal;
  color: #333;
  text-transform: none;
}
.uk-button-primary {
  background-color: #26ace2;
}
.uk-tab > .uk-active > a {
  border-color: #26ace2;
}
a,
.uk-link {
  color: #26ace2;
}
</style>

<template>
  <div>
    <div class="uk-alert-primary" uk-alert>
      <a class="uk-alert-close" uk-close></a>
      <p>این بخش در حال توسعه است و هنوز قابلیت اجرایی ندارد !!!.</p>
    </div>
    <br />

    <div
      class="uk-alert-success"
      uk-alert
      v-if="this.userCreated && this.loggedIN"
    >
      <a class="uk-alert-close" uk-close></a>
      <p>شما با موفقیت عضو و وارد شدید.</p>
    </div>

    <div class="uk-alert-allert" uk-alert v-if="this.userAllert">
      <a class="uk-alert-close" uk-close></a>
      <p>{{ this.userAllert }}</p>
    </div>

    <div class="uk-grid-small uk-visible-toggle" uk-grid tabindex="-1">
      <!-- login area -->
      <div class="uk-width-1-3@s">
        <input
          v-model="inputData.username"
          v-if="!loggedIN && !loginWithPass"
          class="
            uk-input uk-width-1-1 uk-form-small uk-padding-remove-horizontal
          "
          type="text"
          placeholder="نام کاربری خود را وارد کنید."
        />
        <input
          v-model="inputData.password"
          v-if="!loggedIN && loginWithPass"
          class="
            uk-input uk-width-1-1 uk-form-small uk-padding-remove-horizontal
          "
          type="password"
          placeholder="پسورد خود را وارد کنید."
        />
        <p
          v-if="loggedIN"
          class="uk-text-right uk-padding-right-small uk-margin-small-top"
        >
          سلام {{ myAlias }}
        </p>
      </div>

      <div class="uk-width-1-3@s">
        <button
          class="
            uk-button
            uk-button-small
            uk-button-text
            uk-width-1-1
            uk-padding-remove-horizontal
          "
          v-if="!loggedIN"
          :disabled="!inputData.username || loginWithPass"
          @click="webAuthValidate"
        >
          تایید هویت بایومتریک <span uk-icon="500px"></span>
        </button>
        <button
          class="
            uk-button
            uk-button-small
            uk-button-text
            uk-width-1-1
            uk-padding-remove-horizontal
          "
          type="button"
          v-if="loggedIN"
          uk-toggle="target: #my-profile"
          uk-tooltip="برای نمایش اطلاعات کاربری خود کلیک کنید"
        >
          اطلاعات کاربری <span uk-icon="user"></span>
        </button>
      </div>
      <div class="uk-width-1-3@s">
        <button
          class="uk-button uk-button-text uk-button-small uk-width-1-1"
          v-if="!loggedIN && !loginWithPass"
          :disabled="!inputData.username && !loginWithPass"
          @click="loginWithPass = !loginWithPass"
        >
          تایید هویت با پس‌ورد <span uk-icon="hashtag"></span>
        </button>
        <button
          class="uk-button uk-button-text uk-button-small uk-width-1-1"
          v-if="!loggedIN && loginWithPass"
          :disabled="!inputData.username"
          @click="passwordValidate"
        >
          ورود پا پسورد <span uk-icon="hashtag"></span>
        </button>
        <button
          class="uk-button uk-button-text uk-button-small uk-width-1-1"
          v-if="loggedIN"
          @click="gunExit"
        >
          خروج <span uk-icon="sign-out"></span>
        </button>
      </div>
      <!-- user profile area -->
      <div class="uk-width-1-3@s">
        <!-- This is the profile modal -->
        <div id="my-profile" uk-modal>
          <div class="uk-modal-dialog uk-modal-body">
            <h2 class="uk-modal-title">پروفایل کابری</h2>
            <p>نام شما : {{ this.myAlias }}</p>
            <p>کلید عمومی شما :</p>
            <pre><code> {{ this.myPub }}</code></pre>
            <p class="uk-text-right">
              <button
                class="uk-button uk-button-default uk-modal-close"
                type="button"
              >
                بستن
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as defaults from "../libs/defaults";
import {
  generateId,
  generateChallenge,
  ab2b64,
  encodeCredential,
  encodeAssertion,
} from "../libs/helpers";

export default {
  name: "p2pLogin",
  mounted() {
    this.user = this.$gun.user().recall({ sessionStorage: true });
    this.sea = SEA;
    if (this.user.is) {
      this.loggedIN = true;
      const pub = this.user.is.pub;
      let self = this;
      this.$gun.user(pub).once((data, key) => {
        self.myAlias = data && data.alias ? data.alias : "none";
        self.myPub = pub ? pub : epub;
      });
    }
  },

  data: () => ({
    inputData: {
      username: "",
      password: "",
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
    userCreated: null,
    userAllert: null,
    myAlias: "",
    myPub: "",
    loggedIN: false,
    loginWithPass: false,
  }),
  computed: {
    formattedUserDetails() {
      if (!this.userDetails) return null;
      return {
        ...this.userDetails,
        id: ab2b64(this.userDetails.id),
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
    async webAuthValidate() {
      // chceck if user exists in Gundb
      // if exists : validate login
      // if not : create new , then login

      await this.$gun.get("~@" + this.inputData.username);
      await this.$gun.get("~@" + this.inputData.username).once((cb) => {
        if (cb) {
          this.gunAuthenticate();
        } else {
          this.gunRegister();
        }
      });
    },
    async passwordValidate() {
      await this.$gun.get("~@" + this.inputData.username);
      await this.$gun.get("~@" + this.inputData.username).once((cb) => {
        if (cb) {
          this.gunAuthenticate();
        } else {
          this.gunRegister();
        }
      });
    },

    async gunRegister() {
      let self = this;
      this.user.create(
        this.inputData.username,
        this.inputData.password,
        (cb) => {
          if (cb.err) {
            self.userAllert = cb.err;
          } else {
            const pub = this.user.is.pub;
            let self = this;
            this.$gun.user(pub).once((data, key) => {
              self.myAlias = data.alias;
              self.myPub = pub;
              self.loggedIN = true;
              self.userCreated = true;
              self.userAllert = null;
              self.$forceUpdate();
            });
          }
        }
      );
    },
    async gunAuthenticate() {
      const self = this;
      this.user.auth(this.inputData.username, this.inputData.password, (cb) => {
        if (cb.err) {
          self.userAllert = cb.err;
          self.loginWithPass = false;
        } else {
          const pub = this.user.is.pub;
          let self = this;
          this.$gun.user(pub).once((data, key) => {
            self.myAlias = data.alias;
            self.myPub = pub;
          });
          self.userAllert = null;
          self.loggedIN = true;
          self.$forceUpdate();
          // this.$gun.user().recall({ sessionStorage: true });
        }
      });
    },
    async gunExit() {
      this.$gun.user().leave();
      this.loggedIN = false;
      this.$forceUpdate();
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
          name: this.inputData.username,
          displayName: this.inputData.username,
        },
      };

      console.log({ publicKey });

      // register / create a new credential
      try {
        const cred = await navigator.credentials.create({ publicKey });
        this.savedCred = cred;
        this.userDetails = publicKey.user;
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

    async customCode() {
      // console.log("say hello");
      var pair = await this.sea.pair(); // generate a new key pair
      console.log(pair);
      var alias = "alizemaniddsdsdsdssssd";
      // var pass = "secresssssssdsdsssssst";
      // var salt = 1; // random
      // var proof = await this.sea.work(alias, pass); // don't do this! (pass, salt) instead!
      // var auth = await this.sea.encrypt(pair, proof);
      // console.log(auth);
      // now on another machine...
      // var login = await this.sea.work(alias, pass);
      // var keys = await this.sea.decrypt(auth, login); // encrypted auth loaded from graph
      // console.log(keys); // equal to the original key pair
      // console.log(this.user.is);
      // await this.$gun.user().create(alias, pass, (cb) => {
      //   console.log(cb);
      // });
      this.$gun.user().auth(pair, alias, null, (cb) => {
        console.log(cb);
      });
      let self = this;
      this.$gun.on("auth", (ack) => {
        self.loggedIN = true;
        // self.$forceUpdate();
        console.log("Authentication was successful: ", ack);
      });
      console.log("------- start --------");
      const pub = this.user.is;
      console.log(pub);
      // this.$gun.user(pub).once(function (ack) {
      //   console.log(ack);
      //   // console.log(pub);
      //   // self.myAlias = data && data.alias ? data.alias : "none";
      //   // self.myPub = pub ? pub : epub;
      // });

      // console.log(this.user.is);
      // this.user.put("data");
      // this.$gun.get("user", function (ack) {
      //   console.log(ack);
      // });
      console.log("---------- end -----");
    },
  },
};
</script>
 
 
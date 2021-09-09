
<template>
  <div>
    <br />
    <p class="uk-text-meta">
      برای تماس مستقیم با من می توانید پیام صوتی بگذارید.
    </p>
    <div class="uk-alert-danger" uk-alert>
      <a class="uk-alert-close" uk-close></a>
      <p>این بخش در حال توسعه است و هنوز قابلیت اجرایی ندارد!!!</p>
    </div>
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
      <div class="uk-width-1-2@s" :hidden="this.loggedIN">
        <input
          v-model="inputData.username"
          class="uk-input uk-width-1-1"
          type="text"
          placeholder="نام"
          :disabled="this.loggedIN"
        />
      </div>
      <div class="uk-width-1-4@s" :hidden="this.loggedIN">
        <button
          class="
            uk-button
            uk-button-default
            uk-width-1-1
            uk-padding-remove-horizontal
          "
          :disabled="this.loggedIN"
          @click="gunRegister"
        >
          عضویت و ورود
        </button>
      </div>
      <div class="uk-width-1-4@s" :hidden="this.loggedIN">
        <button
          class="uk-button uk-button-default uk-width-1-1 uk-button-primary"
          :disabled="this.loggedIN"
          @click="gunAuthenticate"
        >
          ورود
        </button>
      </div>
      <!-- user profile area -->
      <div class="uk-width-1-3@s" :hidden="!this.loggedIN">
        <p class="uk-text-right uk-padding-right-small uk-margin-small-top">
          شما با نام
          {{ myAlias }}
          وارد شده اید.
        </p>
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
      <div class="uk-width-1-3@s" :hidden="!this.loggedIN">
        <button
          class="uk-button uk-button-default uk-width-1-1"
          type="button"
          :disabled="!this.loggedIN"
          uk-toggle="target: #my-profile"
          uk-tooltip="برای نمایش اطلاعات کاربری خود کلیک کنید"
        >
          پروفایل
        </button>
      </div>

      <div class="uk-width-1-3@s" :hidden="!this.loggedIN">
        <button
          class="uk-button uk-button-default uk-width-1-1 uk-button-primary"
          :disabled="!this.loggedIN"
          @click="gunExit"
        >
          خروج
        </button>
      </div>
    </div>
    <div class="uk-margin"></div>
    <button
      v-bind:class="{
        'uk-button-primary': !recording,
        'uk-button-danger': recording,
      }"
      class="uk-button uk-button-default uk-width-1-1"
      @mousedown="countDownTimer"
      @mouseup="stopRecording"
    >
      {{
        recording
          ? "در حال ضبط صدا..."
          : "برای ضبط صدا " +
            this.persian_number(this.counter) +
            "  ثانیه نگه دارید ."
      }}
    </button>
    <br />
    <p></p>

    <hr />
    <ul class="uk-list uk-list-hyphen uk-list-divider">
      <li
        v-for="voice in voiceList"
        class="uk-visible-toggle"
        tabindex="-1"
        v-bind:key="voice.key"
      >
        <p class="uk-text-lead uk-text-default">{{ voice.date }}</p>
        <client-only>
          <av-line
            :canv-width="500"
            :fft-size="128"
            :audio-controls="true"
            class="uk-width-1-1"
            :line-width="2"
            line-color="#39f"
            v-bind:audio-src="voice.data"
            v-if="voice.data"
          ></av-line>
        </client-only>
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
  name: "p2pContact",
  beforeMount() {
    const UIkit = require("uikit");
    const Icons = require("uikit/dist/js/uikit-icons");
    UIkit.use(Icons);
    window.UIkit = UIkit;
  },
  mounted() {
    this.user = this.$gun.user().recall({ sessionStorage: true });
    this.sea = SEA;
    if (this.user.is) {
      this.loggedIN = true;
      console.log(this.loggedIN);
      const pub = this.user.is.pub;
      let self = this;
      this.$gun.user(pub).once((data, key) => {
        console.log(data);
        console.log(pub);
        self.myAlias = data && data.alias ? data.alias : "none";
        self.myPub = pub ? pub : epub;
      });
    }
    this.loadVoices();
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
    voiceList: [],
    userCreated: null,
    userAllert: null,
    myAlias: "",
    myPub: "",
    loggedIN: false,
    recording: false,
    recorder: null,
    counter: 3,
    file: null,
    items: [],
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
    async loadVoices() {
      var self = this;
      await this.$gun
        .get("voice-contact")
        .get("test6")
        .map()
        .once(function (item) {
          self.voiceList.push(item);
        });
    },
    async gunRegister() {
      let self = this;
      this.user.create(this.inputData.username, "custom pass", (cb) => {
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
      });
    },
    async gunAuthenticate() {
      const self = this;
      this.user.auth(this.inputData.username, "custom pass", (cb) => {
        if (cb.err) {
          self.userAllert = cb.err;
        } else {
          const pub = this.user.is.pub;
          let self = this;
          this.$gun.user(pub).once((data, key) => {
            self.myAlias = data.alias;
            self.myPub = pub;
          });
          self.userAllert = null;
          this.loggedIN = true;
          self.$forceUpdate();
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
          name: this.inputData.emailAddress,
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
    async startRecording() {
      this.file = null;
      console.log("recording");
      this.recording = true;

      var device = navigator.mediaDevices.getUserMedia({ audio: true });
      device.then((stream) => {
        this.items = [];
        this.recorder = new MediaRecorder(stream);

        this.recorder.ondataavailable = (e) => {
          console.log("data incoming");
          this.items.push(e.data);
        };
        this.recorder.onstop = (e) => {
          const blob = new Blob(this.items, { type: "audio/ogg; codecs=opus" });
          this.file = URL.createObjectURL(blob);
          // console.log(this.file);
          console.log("recorder stopped");
          let self = this;
          this.blobToBase64(blob).then((res) => {
            // this.file = res;
            this.$gun
              .get("voice-contact")
              .get("test6")
              .set({ data: res, date: Date.now() }, (cb) => {
                if (cb.ok) {
                  self.userAllert = "پیام صوتی شما ارسال شد.";
                }
              });
            console.log(res); // res is base64 now
          });
        };
        this.recorder.start();
      });
    },
    stopRecording() {
      this.counter = 3;
      this.recording = false;
      console.log("stoping");

      this.recorder.stop();
    },
    countDownTimer() {
      if (this.counter > 0) {
        setTimeout(() => {
          this.counter -= 1;
          this.countDownTimer();
        }, 1000);
      }
      if (this.counter === 0) {
        this.startRecording();
      }
    },
    blobToBase64(blob) {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      return new Promise((resolve) => {
        reader.onloadend = () => {
          resolve(reader.result);
        };
      });
    },
    persian_number(number) {
      console.log(number);
      let en_number = number.toString();
      let persianDigits = "۰۱۲۳۴۵۶۷۸۹";
      let persianMap = persianDigits.split("");
      let persian_number = en_number.replace(/\d/g, function (m) {
        return persianMap[parseInt(m)];
      });
      return persian_number;
    },

    async customCode() {
      console.log("say hello");
      // var pair = await this.sea.pair(); // generate a new key pair
      // console.log(pair);
      // var alias = "alizemaniddsdsdsdssssd";
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
      // this.$gun.user().auth(pair, alias, null, (cb) => {
      //   console.log(cb);
      // });
      // let self = this;
      // this.$gun.on("auth", (ack) => {
      //   self.loggedIN = true;
      //   // self.$forceUpdate();
      //   console.log("Authentication was successful: ", ack);
      // });
      // console.log("------- start --------");
      // const pub = this.user.is;
      // console.log(pub);
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
      // console.log("---------- end -----");
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
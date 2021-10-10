
<template>
  <div>
    <div class="uk-margin">
      <select class="uk-select">
        <option>سفارش کار</option>
        <option>درخواست مشاوره</option>
        <option>عمومی</option>
      </select>
    </div>
    <div class="uk-margin">
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
    </div>
    <div class="uk-margin">
      <button
        @click="adminLoad"
        class="uk-button uk-button-default uk-width-1-1"
      >
        admin Load
      </button>
    </div>
    <div class="uk-margin">
      <button @click="sendME" class="uk-button uk-button-default uk-width-1-1">
        Send ME
      </button>
    </div>
    <div class="uk-margin">
      <button @click="getME" class="uk-button uk-button-default uk-width-1-1">
        get ME
      </button>
    </div>
    <p class="uk-text-meta">
      برای تماس مستقیم با من می توانید پیام صوتی بگذارید.
    </p>

    <hr />
    <div class="uk-margin-small-top uk-timeline">
      <div
        class="uk-timeline-item"
        v-for="voice in orderBydate"
        v-bind:class="'voice_' + voice.date"
        tabindex="-1"
        v-bind:key="voice.date"
      >
        <div class="uk-timeline-content">
          <div
            class="
              uk-card
              uk-card-small
              uk-card-default
              uk-margin-small-bottom
              uk-overflow-auto
            "
          >
            <div class="uk-card-header uk-background-muted">
              <div class="uk-grid-small uk-flex-middle" uk-grid>
                <span class="uk-card-title uk-text-meta">
                  {{ persian_number(persian_date(voice.date)) }}
                </span>
                <span class="uk-card-title uk-text-meta"> محمد ابراهیمی </span>

                <span class="uk-label uk-label-success uk-margin-auto-right"
                  >درخواست مشاوره</span
                >
                <span class="uk-label uk-label-alert uk-margin-small-right"
                  >جدید</span
                >
                <span class="uk-label uk-label-alert uk-margin-small-right"
                  >پاسخ دادن</span
                >
              </div>
            </div>

            <div class="uk-card-body uk-padding-small">
              <av-waveform
                :canv-width="500"
                :audio-controls="false"
                class="uk-width-1-1"
                :line-width="4"
                noplayed-line-color="#39f"
                :playtime-line-width="5"
                :playtime-clickable="true"
                v-bind:audio-src="voice.data"
                v-if="voice.data"
              ></av-waveform>
            </div>
            <div class="uk-card-footer">
              <span class="uk-card-title uk-text-meta">
                {{ persian_number(persian_date(voice.date)) }} پاسخ داده شد.
              </span>
              <span
                class="
                  uk-label
                  uk-label-alert
                  uk-margin-small-right
                  uk-padding-small-top
                "
                @click="playVoice(voice.date)"
              >
                <span uk-icon="play" v-if="playingItem !== voice.date"></span>
                <span uk-icon="close" v-if="playingItem == voice.date"></span>
              </span>

              <av-waveform
                :canv-width="500"
                :audio-controls="false"
                class="uk-padding-small uk-margin-small-top"
                :line-width="4"
                noplayed-line-color="#39f"
                :playtime-line-width="5"
                :playtime-clickable="true"
                v-bind:audio-src="voice.data"
                v-if="voice.data"
              ></av-waveform>
            </div>
          </div>
        </div>
        <div class="uk-timeline-icon">
          <span class="uk-badge" @click="playVoice(voice.date)">
            <span uk-icon="play" v-if="playingItem !== voice.date"></span>
            <span uk-icon="close" v-if="playingItem == voice.date"></span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const moment = require("moment-jalaali");
moment.locale("fa-IR"); // fa
import _ from "lodash";

export default {
  name: "p2pContact",
  async mounted() {
    this.user = this.$gun.user().recall({ sessionStorage: true });
    // this.loadVoices();
  },
  computed: {
    orderBydate: function () {
      // console.log(this.voiceList);
      return _.orderBy(this.voiceList, "date", ["desc"]);
    },
  },
  data: () => ({
    voiceList: [],
    loggedIN: false,
    recording: false,
    recorder: null,
    user: null,
    counter: 3,
    file: null,
    items: [],
    playingItem: null,
    currentTime: null,
    owner_pub:
      "5nkDFG7Tkj-rAiMBz1ls5vUV9buM_R-E71zm0WPoeiw.uiPPbqeM5q9ZLwIxnTgflWOH3WoJgHQ0Rd_e3D013c4",
  }),

  methods: {
    async getME() {
      const testUSer =
        "Wy_J4WC966IkwXeu6sZv4Nc2Y5dPQB7acKVW4sA9HXE.hdkqURPAys78Zq94I_016BYfB8XXSqwRmoXyK3h4gv4";
      const test = await this.$gun.user(testUSer);
      const user = this.$gun.user();
      await this.$gun
        .user()
        .get("voice-mail")
        .once(function (incoming, key) {
          (async () => {
            console.log(incoming);
            // console.log(incoming);
            var dec = await SEA.decrypt(
              incoming,
              await SEA.secret(test.epub, user._.sea)
            );
            console.log(dec);
          })();
        });
    },
    async sendME() {
      const user = this.$gun.user();
      const pair = user._.sea;
      const admin = await this.$gun.user(this.owner_pub);
      const adminEpub = admin.epub;
      var enc = await SEA.encrypt(
        "shared data",
        await SEA.secret(adminEpub, pair)
      );
      // console.log(enc);
      const certificate = await this.$gun
        .get("global-config")
        .get("inbox")
        .get("cert")
        .then();
      await this.$gun
        .get("~" + this.owner_pub)
        .get("inbox")
        .get(pair.epub)
        .set(enc, console.log, { opt: { cert: certificate } });
    },
    async adminLoad() {
      const admin = this.$gun.user();
      var certificate = await SEA.certify(
        "*", // everyone
        { "*": "voice-mail", ".": "*" },
        admin._.sea
      );
      await this.$gun
        .get("global-config")
        .get("voice-mail")
        .get("cert")
        .put(certificate);
    },
    async loadVoices() {
      const testUSer =
        "an1fr61SYFeEpFnwbHHpN-Xdos8qBXSv5rUQOQ6H3z4.phpIpA6RNEflE3s35Oiiqmu9QBOObAxVygby4ChDjLE";
      const test = await this.$gun.user(testUSer);
      const user = this.$gun.user();

      var self = this;
      await this.user
        .get("voice-mail-test1")
        .map()
        .once(function (enc) {
          (async () => {
            var dec = await SEA.decrypt(
              enc,
              await SEA.secret(test.epub, user._.sea)
            );
            if (dec && dec.date && dec.data) {
              self.voiceList.push(dec);
            }
          })();
        });
    },
    async playVoice(item) {
      var audio = document.querySelector(".voice_" + item + " audio");
      if (audio.paused) {
        this.playingItem = item;
        audio.play();
      } else {
        this.playingItem = null;
        audio.pause();
      }
    },
    async startRecording() {
      const certificate = await this.$gun
        .get("global-config")
        .get("voice-mail")
        .get("cert")
        .then();

      const user = this.$gun.user();
      const pair = user._.sea;
      const admin = await this.$gun.user(this.owner_pub);
      const adminEpub = admin.epub;

      this.file = null;
      this.recording = true;

      var device = navigator.mediaDevices.getUserMedia({ audio: true });
      device.then((stream) => {
        this.items = [];
        this.recorder = new MediaRecorder(stream);
        window.localStream = stream;

        this.recorder.ondataavailable = (e) => {
          this.items.push(e.data);
        };

        this.recorder.onstop = (e) => {
          const blob = new Blob(this.items, { type: "audio/ogg; codecs=opus" });
          this.file = URL.createObjectURL(blob);
          let self = this;
          this.blobToBase64(blob).then((res) => {
            (async () => {
              var enc = await SEA.encrypt(
                { data: res, date: Date.now() },
                await SEA.secret(adminEpub, pair)
              );

              await this.$gun
                .get("~" + this.owner_pub)
                .get("voice-mail")
                .get(pair.epub)
                .set(
                  enc,
                  (cb) => {
                    if (cb.ok) {
                      console.log("پیام صوتی شما ارسال شد.");
                      self.userAllert = "پیام صوتی شما ارسال شد.";
                    }
                  },
                  { opt: { cert: certificate } }
                );
            })();
          });
        };
        this.recorder.start();
      });
    },
    stopRecording() {
      this.counter = 3;
      this.recording = false;
      this.recorder.stop();
      window.localStream.getTracks()[0].stop();
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
<style scoped>
.uk-timeline .uk-timeline-item::before {
  background: #1e87f02e;
  content: "";
  height: 100%;
  left: 19px;
  position: absolute;
  top: 20px;
  width: 2px;
  z-index: 1;
}
.uk-timeline .uk-timeline-item {
  display: flex;
  position: relative;
}
.uk-timeline .uk-timeline-item .uk-timeline-icon .uk-badge {
  margin-top: 5px;
  width: 40px;
  height: 40px;
  position: relative;
  z-index: 2;
}
.uk-timeline .uk-timeline-item .uk-timeline-content {
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  padding: 0 0 0 1rem;
  margin-bottom: 2rem;
}
</style>
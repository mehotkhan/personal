
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
            <div class="uk-card-header">
              <div class="uk-grid-small uk-flex-middle" uk-grid>
                <span class="uk-label uk-label-success uk-margin-auto-left"
                  >درخواست مشاوره</span
                >
                <span class="uk-card-title uk-text-meta">
                  {{ persian_number(persian_date(voice.date)) }}
                </span>
              </div>
            </div>
            <div
              class="
                uk-card
                uk-card-small
                uk-card-default
                uk-card-body
                uk-padding-small
              "
            >
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
  mounted() {
    this.loadVoices();
  },
  computed: {
    orderBydate: function () {
      return _.orderBy(this.voiceList, "date", ["desc"]);
    },
  },
  data: () => ({
    voiceList: [],
    loggedIN: false,
    recording: false,
    recorder: null,
    counter: 3,
    file: null,
    items: [],
    playingItem: null,
    currentTime: null,
  }),

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
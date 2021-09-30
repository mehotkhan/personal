
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

    <div
      class="uk-grid-collapse uk-child-width-expand@s uk-text-center"
      uk-grid
      v-for="voice in voiceList"
      v-bind:class="'voice_' + voice.date"
      tabindex="-1"
      v-bind:key="voice.date"
    >
      <div class="uk-width-1-5@s">
        <div>
          <span>
            {{ new Date(voice.date).toISOString().substring(0, 10) }}</span
          >
          <span @click="playVoice('voice_' + String(voice.date))">
            {{ "voice_" + String(voice.date) !== playingItem ? "پخش" : "توقف" }}
          </span>
        </div>
      </div>
      <div class="uk-width-expand@s">
        <div>
          <av-line
            :canv-width="600"
            :fft-size="128"
            :audio-controls="false"
            class="uk-width-1-1"
            :line-width="3"
            line-color="#39f"
            v-bind:audio-src="voice.data"
            v-if="voice.data"
          ></av-line>
        </div>
      </div>
    </div>

    <hr />
    <ul class="uk-list uk-list-divider" :hidden="true">
      <li
        v-for="voice in voiceList"
        class="uk-visible-toggle"
        v-bind:class="'voice_' + voice.date"
        tabindex="-1"
        v-bind:key="voice.date"
      >
        <button
          class="uk-button uk-button-default uk-button-small"
          @click="playVoice('voice_' + String(voice.date))"
        >
          {{ "voice_" + String(voice.date) !== playingItem ? "پخش" : "توقف" }}
        </button>

        <av-line
          :canv-width="500"
          :fft-size="128"
          :audio-controls="false"
          class="uk-width-1-1"
          :line-width="3"
          line-color="#39f"
          v-bind:audio-src="voice.data"
          v-if="voice.data"
        ></av-line>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "p2pContact",
  mounted() {
    this.loadVoices();
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
      var audio = document.querySelector("." + item + " audio");
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
      console.log(number);
      let en_number = number.toString();
      let persianDigits = "۰۱۲۳۴۵۶۷۸۹";
      let persianMap = persianDigits.split("");
      let persian_number = en_number.replace(/\d/g, function (m) {
        return persianMap[parseInt(m)];
      });
      return persian_number;
    },
  },
};
</script>

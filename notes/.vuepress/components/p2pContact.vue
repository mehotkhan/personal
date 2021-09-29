
<template>
  <div>
    <br />
    <p class="uk-text-meta">
      برای تماس مستقیم با من می توانید پیام صوتی بگذارید.
    </p>

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
  }),

  methods: {
    async loadVoices() {
      var self = this;
      await this.$gun
        .get("voice-contact")
        .get("test7")
        .map()
        .once(function (item) {
          self.voiceList.push(item);
        });
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
              .get("test7")
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

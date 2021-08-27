
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
    <ul uk-tab="animation: uk-animation-fade">
      <li>
        <a href="#"> دیدگاه های : {{ title }}</a>
      </li>
      <li class="uk-active">
        <a href="#">عضویت و ارسال دیدگاه</a>
      </li>
    </ul>
    <ul class="uk-switcher uk-margin">
      <li>
        <ul class="uk-comment-list">
          <li>
            <article class="uk-comment uk-visible-toggle" tabindex="-1">
              <header class="uk-comment-header uk-position-relative">
                <div class="uk-grid-medium uk-flex-middle" uk-grid>
                  <div class="uk-width-expand">
                    <h4 class="uk-comment-title uk-margin-remove">
                      <a class="uk-link-reset" href="#">نویسنده دیدگاه</a>
                    </h4>

                    <p class="uk-comment-meta uk-margin-remove-top">
                      <a class="uk-link-reset" href="#">۱۲ روز پیش</a>
                    </p>
                    <p class="uk-position-bottom-right uk-hidden-hover">
                      <a class="uk-link-reset" href="#">کلید عمومی کاربر</a>
                      <code
                        >Qmezm7g8mBpWyuPk6D84CNcfLKJwU6mpXuEN5GJZNkX3XK
                      </code>
                    </p>
                  </div>
                </div>
                <div
                  class="uk-position-top-left uk-position-small uk-hidden-hover"
                >
                  <a class="uk-link-muted" href="#">پاسخ به این دیدگاه</a>
                </div>
              </header>
              <div class="uk-comment-body">
                <p>متن دیدگاه</p>
              </div>
            </article>
            <ul>
              <li>
                <article
                  class="uk-comment uk-comment-primary uk-visible-toggle"
                  tabindex="-1"
                >
                  <header class="uk-comment-header uk-position-relative">
                    <div class="uk-grid-medium uk-flex-middle" uk-grid>
                      <div class="uk-width-expand">
                        <h4 class="uk-comment-title uk-margin-remove">
                          <a class="uk-link-reset" href="#">نویسنده نظر </a>
                        </h4>
                        <p class="uk-comment-meta uk-margin-remove-top">
                          <a class="uk-link-reset" href="#">۱۲ روز قبل</a>
                        </p>
                        <p class="uk-position-bottom-right uk-hidden-hover">
                          <a class="uk-link-reset" href="#">کلید عمومی کاربر</a>
                          <code
                            >Qmezm7g8mBpWyuPk6D84CNcfLKJwU6mpXuEN5GJZNkX3XK
                          </code>
                        </p>
                      </div>
                    </div>
                    <div
                      class="
                        uk-position-top-left uk-position-small uk-hidden-hover
                      "
                    >
                      <a class="uk-link-muted" href="#">پاسخ</a>
                    </div>
                  </header>
                  <div class="uk-comment-body">
                    <p>پاسخ به دیدگاه قبل</p>
                  </div>
                </article>
              </li>
            </ul>
          </li>
          <hr />
          <li>
            <article class="uk-comment uk-visible-toggle" tabindex="-1">
              <header class="uk-comment-header uk-position-relative">
                <div class="uk-grid-medium uk-flex-middle" uk-grid>
                  <div class="uk-width-expand">
                    <h4 class="uk-comment-title uk-margin-remove">
                      <a class="uk-link-reset" href="#">نویسنده دیدگاه</a>
                    </h4>

                    <p class="uk-comment-meta uk-margin-remove-top">
                      <a class="uk-link-reset" href="#">۱۲ روز پیش</a>
                    </p>
                    <p class="uk-position-bottom-right uk-hidden-hover">
                      <a class="uk-link-reset" href="#">کلید عمومی کاربر</a>
                      <code
                        >Qmezm7g8mBpWyuPk6D84CNcfLKJwU6mpXuEN5GJZNkX3XK
                      </code>
                    </p>
                  </div>
                </div>
                <div
                  class="uk-position-top-left uk-position-small uk-hidden-hover"
                >
                  <a class="uk-link-muted" href="#">پاسخ به این دیدگاه</a>
                </div>
              </header>
              <div class="uk-comment-body">
                <p>متن دیدگاه</p>
              </div>
            </article>
            <ul>
              <li>
                <article
                  class="uk-comment uk-comment-primary uk-visible-toggle"
                  tabindex="-1"
                >
                  <header class="uk-comment-header uk-position-relative">
                    <div class="uk-grid-medium uk-flex-middle" uk-grid>
                      <div class="uk-width-expand">
                        <h4 class="uk-comment-title uk-margin-remove">
                          <a class="uk-link-reset" href="#">نویسنده نظر </a>
                        </h4>
                        <p class="uk-comment-meta uk-margin-remove-top">
                          <a class="uk-link-reset" href="#">۱۲ روز قبل</a>
                        </p>
                        <p class="uk-position-bottom-right uk-hidden-hover">
                          <a class="uk-link-reset" href="#">کلید عمومی کاربر</a>
                          <code
                            >Qmezm7g8mBpWyuPk6D84CNcfLKJwU6mpXuEN5GJZNkX3XK
                          </code>
                        </p>
                      </div>
                    </div>
                    <div
                      class="
                        uk-position-top-left uk-position-small uk-hidden-hover
                      "
                    >
                      <a class="uk-link-muted" href="#">پاسخ</a>
                    </div>
                  </header>
                  <div class="uk-comment-body">
                    <p>پاسخ به دیدگاه قبل</p>
                  </div>
                </article>
              </li>
            </ul>
          </li>
          <hr />
          <li>
            <article class="uk-comment uk-visible-toggle" tabindex="-1">
              <header class="uk-comment-header uk-position-relative">
                <div class="uk-grid-medium uk-flex-middle" uk-grid>
                  <div class="uk-width-expand">
                    <h4 class="uk-comment-title uk-margin-remove">
                      <a class="uk-link-reset" href="#">نویسنده دیدگاه</a>
                    </h4>

                    <p class="uk-comment-meta uk-margin-remove-top">
                      <a class="uk-link-reset" href="#">۱۲ روز پیش</a>
                    </p>
                    <p class="uk-position-bottom-right uk-hidden-hover">
                      <a class="uk-link-reset" href="#">کلید عمومی کاربر</a>
                      <code
                        >Qmezm7g8mBpWyuPk6D84CNcfLKJwU6mpXuEN5GJZNkX3XK
                      </code>
                    </p>
                  </div>
                </div>
                <div
                  class="uk-position-top-left uk-position-small uk-hidden-hover"
                >
                  <a class="uk-link-muted" href="#">پاسخ به این دیدگاه</a>
                </div>
              </header>
              <div class="uk-comment-body">
                <p>متن دیدگاه</p>
              </div>
            </article>
            <ul>
              <li>
                <article
                  class="uk-comment uk-comment-primary uk-visible-toggle"
                  tabindex="-1"
                >
                  <header class="uk-comment-header uk-position-relative">
                    <div class="uk-grid-medium uk-flex-middle" uk-grid>
                      <div class="uk-width-expand">
                        <h4 class="uk-comment-title uk-margin-remove">
                          <a class="uk-link-reset" href="#">نویسنده نظر </a>
                        </h4>
                        <p class="uk-comment-meta uk-margin-remove-top">
                          <a class="uk-link-reset" href="#">۱۲ روز قبل</a>
                        </p>
                        <p class="uk-position-bottom-right uk-hidden-hover">
                          <a class="uk-link-reset" href="#">کلید عمومی کاربر</a>
                          <code
                            >Qmezm7g8mBpWyuPk6D84CNcfLKJwU6mpXuEN5GJZNkX3XK
                          </code>
                        </p>
                      </div>
                    </div>
                    <div
                      class="
                        uk-position-top-left uk-position-small uk-hidden-hover
                      "
                    >
                      <a class="uk-link-muted" href="#">پاسخ</a>
                    </div>
                  </header>
                  <div class="uk-comment-body">
                    <p>پاسخ به دیدگاه قبل</p>
                  </div>
                </article>
              </li>
            </ul>
          </li>
          <hr />
        </ul>
      </li>
      <li>
        <fieldset class="uk-fieldset">
          <div class="uk-grid-small" uk-grid>
            <div class="uk-width-1-2@s">
              <input
                v-model="inputData.username"
                class="uk-input"
                type="text"
                placeholder="نام"
              />
            </div>
            <div class="uk-width-1-2@s">
              <input
                v-model="inputData.emailAddress"
                class="uk-input"
                type="email"
                placeholder="رایانامه"
              />
            </div>
          </div>
          <div class="uk-margin uk-grid-small" uk-grid>
            <div class="uk-width-1-3@s">
              <button
                uk-icon="sign-in"
                class="
                  uk-button
                  uk-button-default
                  uk-width-1-1
                  uk-margin-small-bottom
                "
                :disabled="!(inputData.username && inputData.emailAddress)"
                @click="register"
              >
                عضویت
              </button>
            </div>
            <div class="uk-width-1-3@s">
              <button
                uk-icon="user"
                class="
                  uk-button
                  uk-button-default
                  uk-width-1-1
                  uk-margin-small-bottom
                "
                :disabled="
                  !(inputData.username && inputData.emailAddress && savedCred)
                "
                @click="authenticate"
              >
                ورود
              </button>
            </div>
            <div class="uk-width-1-3@s">
              <button
                uk-icon="sign-out"
                class="
                  uk-button
                  uk-button-default
                  uk-width-1-1
                  uk-margin-small-bottom
                "
                :disabled="!(assertion && savedCred)"
                @click="exit"
              >
                خروج
              </button>
            </div>
          </div>
          <hr />
          <div class="uk-margin">
            <textarea
              :disabled="
                !(inputData.username && inputData.emailAddress && assertion)
              "
              class="uk-textarea"
              rows="5"
              placeholder="نظر شما"
            ></textarea>
          </div>
        </fieldset>
        <p uk-margin>
          <button
            :disabled="
              !(inputData.username && inputData.emailAddress && assertion)
            "
            class="uk-button uk-button-primary uk-button-large"
          >
            ارسال دیدگاه
          </button>
        </p>
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
</style>
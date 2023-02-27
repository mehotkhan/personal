<script setup lang="ts">
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import { JSONRequest } from "@worker-tools/json-fetch";
import * as Structured from "@worker-tools/structured-json";
const { $irisSession } = useNuxtApp();

const isOpen = ref(false);
const username = ref<string>("");
const loading = ref(false);

const webauthLogin = async () => {
  if (username.value?.length >= 3) {
    loading.value = true;
    try {
      const formData = new FormData();
      formData.append("user-handle", username.value);
      const res: any = await $fetch("/webauth/login", {
        method: "POST",
        body: formData,
      });
      if (res) {
        const publicKey = await Structured.fromJSON(res);
        const loginKeys: any = await getLoginKeys(publicKey);
        if (loginKeys) {
          $irisSession.login(loginKeys);
          loading.value = false;
          isOpen.value = false;
        }
      }
    } catch (error) {
      loading.value = false;
    }
  }
};
const getLoginKeys = async (publicKey: any) => {
  if (publicKey) {
    try {
      const cred =
        "attestation" in publicKey
          ? await navigator.credentials.create({ publicKey })
          : await navigator.credentials.get({ publicKey });
      const body = await Structured.toJSON(credToJSON(cred));
      const loginKeys = await $fetch(
        new JSONRequest("/webauth/get-login-keys", { method: "POST", body })
      );
      return loginKeys;
    } catch (error) {
      return false;
    }
  } else {
    return false;
  }
};
const credToJSON = (x: any = {}): any => {
  if (x instanceof ArrayBuffer) return x;
  if (Array.isArray(x)) {
    const arr = [];
    for (const i of x) arr.push(credToJSON(i));
    return arr;
  }
  if (x != null && typeof x === "object") {
    const obj: any = {};
    for (const key in x)
      if (typeof x[key] !== "function") obj[key] = credToJSON(x[key]);
    return obj;
  }
  return x;
};
</script>

<template>
  <span
    class="hover:underline cursor-pointer flex items-center"
    @click="isOpen = true"
  >
    <IconMdi:fingerprint class="mx-2 flex" />

    ورود به حساب
  </span>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" class="relative z-10 overflow-hidden">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-md bg-white p-5 text-right items-center shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                ورود به حساب کاربری
              </DialogTitle>
              <div class="mt-5">
                <div class="form-group mb-6">
                  <label
                    for="username"
                    class="form-label inline-block mb-2 text-gray-700"
                  >
                    نام کاربری خود را وارد کنید</label
                  >
                  <input
                    id="username"
                    v-model="username"
                    type="text"
                    class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="نام شما"
                  />
                </div>
              </div>

              <div class="mt-10 flex w-full justify-between text-xl text-white">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-red-400 px-5 py-1"
                  @click="isOpen = false"
                >
                  بستن
                </button>
                <button
                  :class="username?.length >= 3 ? 'flex' : 'disabled'"
                  type="button"
                  class="inline-flex items-center rounded-md border border-transparent bg-green-400 px-5 py-1"
                  @click="webauthLogin"
                >
                  ورود
                  <svg
                    v-if="loading"
                    aria-hidden="true"
                    class="flex w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

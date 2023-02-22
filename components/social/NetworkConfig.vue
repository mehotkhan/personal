<script lang="ts" setup>
import { JSONRequest } from "@worker-tools/json-fetch";
import * as Structured from "@worker-tools/structured-json";
import { Switch } from "@headlessui/vue";
const { $SEA, $irisSession, $irisGlobal } = useNuxtApp();
const user = await $irisSession.getKey();
const certsGenerated = ref(false);
const enableWebauthIsOpen = ref(false);
const username = ref<string>("");

const generateCerts = async () => {
  if (username?.value.length >= 3) {
    try {
      const formData = new FormData();
      formData.append("user-handle", username?.value);
      const res: any = await $fetch("/webauth/login", {
        method: "POST",
        body: formData,
      });
      if (res) {
        const publicKey = await Structured.fromJSON(res);
        const status: boolean = await setInboxCerts(publicKey);
        if (status) {
          await $irisGlobal.get("inbox").get(user.pub).put(true);
        }
      }
    } catch (error) {}
  }
};
const setInboxCerts = async (publicKey: any) => {
  const certificate = await $SEA.certify(
    "*", // everyone
    { "#": { "*": "inbox" } },
    user,
    null
  );

  if (publicKey) {
    const cred =
      "attestation" in publicKey
        ? await navigator.credentials.create({ publicKey })
        : await navigator.credentials.get({ publicKey });
    const body = {
      cred: await Structured.toJSON(credToJSON(cred)),
      certificate: JSON.parse(certificate.replace("SEA", "")),
    };
    try {
      await $fetch(
        new JSONRequest("/webauth/set-inbox-certs", { method: "POST", body })
      );
      return true;
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
onMounted(async () => {
  await $irisGlobal
    .get("hardwareKey")
    .get(user.pub)
    .on((item: any) => {
      if (item) {
        username.value = item;
      }
    });
  await $irisGlobal
    .get("inbox")
    .get(user.pub)
    .on((item: any) => {
      if (item) {
        certsGenerated.value = true;
      }
    });
});
</script>
<template>
  <div class="w-full flex-col flex items-start">
    <div class="border-b-1 mb-4 w-full">
      <h3>تنظیمات کلی شبکه</h3>
    </div>
    <div class="flex flex-col w-full py-5">
      <div class="flex items-center justify-between w-full">
        <span class="flex items-center text-md">
          <IconUil:key-skeleton
            class="ml-3 cursor-pointer flex"
            aria-hidden="true"
          />
          <span class="flex"> تولید سرتیفیکیت های ارتباطی</span>
        </span>
        <Switch
          :checked="certsGenerated"
          :class="
            certsGenerated
              ? 'bg-green-200 cursor-not-allowed'
              : 'bg-gray-200 cursor-pointer'
          "
          class="relative inline-flex h-[40px] px-3 w-40 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          @click="!certsGenerated ? generateCerts() : null"
        >
          <span
            aria-hidden="true"
            :class="certsGenerated ? 'left-1' : 'right-1'"
            class="pointer-events-none absolute top-[1px] inline-block h-[32px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
          />
          <span class="text-center w-full text-md">
            {{ certsGenerated ? "تولید شد" : "بدون کلید" }}
          </span>
        </Switch>
      </div>
      <span class="text-sm text-gray-600 mr-4 flex">
        <IconMdi:help class="flex text-sm" aria-hidden="true" />
        <span class="text-lg"> پاره ای توضیحات </span>
      </span>
    </div>
    <SocialWebAuthEnable
      :is-open="enableWebauthIsOpen"
      @close-modal="enableWebauthIsOpen = false"
    />
  </div>
</template>

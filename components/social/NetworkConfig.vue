<script lang="ts" setup>
import { JSONRequest } from "@worker-tools/json-fetch";
import * as Structured from "@worker-tools/structured-json";
import { Switch } from "@headlessui/vue";
const { $SEA, $irisSession, $irisGlobal } = useNuxtApp();
const user = $irisSession.getKey();

const webAuthStatus = ref(false);
const certsGenerated = ref(false);

const enableWebauth = async () => {
  const formData = new FormData();
  formData.append("user-handle", user.pub);
  const res: any = await $fetch("/webauth/register", {
    method: "POST",
    body: formData,
  });
  console.log("register res: ", res);
  if (res) {
    const publicKey = await Structured.fromJSON(res);
    console.log("pub : ", publicKey);
    const status: boolean = await handleResponse(publicKey);
    webAuthStatus.value = status;
  } else {
    console.log("error register", res);
  }
};

const handleResponse = async (publicKey: any) => {
  console.log("handle handleResponse");
  let res: any | null = null;
  if (publicKey) {
    const cred =
      "attestation" in publicKey
        ? await navigator.credentials.create({ publicKey })
        : await navigator.credentials.get({ publicKey });
    const body = await Structured.toJSON(credToJSON(cred));
    console.log("incoming from sensor :", body);
    res = await $fetch(
      new JSONRequest("/webauth/response", { method: "POST", body })
    );
    return res ? true : false;
  } else {
    return false;
  }
};
// Sadly, this is necessary to serialize WebAuthn credentials...
const credToJSON = (x: any = {}) => {
  if (x instanceof ArrayBuffer) return x;
  if (Array.isArray(x)) {
    const arr = [];
    for (const i of x) arr.push(credToJSON(i));
    return arr;
  }
  if (x != null && typeof x === "object") {
    let obj: any = {};
    for (const key in x)
      if (typeof x[key] !== "function") obj[key] = credToJSON(x[key]);
    return obj;
  }
  return x;
};
const GenerateCerts = async () => {
  const user = $irisSession.getKey();
  const certificate = await $SEA.certify(
    "*", // everyone
    { "#": { "*": "inbox" } },
    user,
    null
  );
  await $irisGlobal.get("inbox").get(user.pub).put(true);

  const formData = new FormData();
  formData.append("user-handle", user.pub);
  const res: any = await $fetch("/webauth/login", {
    method: "POST",
    body: formData,
  });
  console.log("login res: ", res);
  if (res) {
    const publicKey = await Structured.fromJSON(res);
    const status: boolean = await handleResponse(publicKey);
    certsGenerated.value = status;
  } else {
    console.log("login error", res);
  }
  console.log(certificate);
  certsGenerated.value = true;
};
</script>
<template>
  <div class="w-full flex-col flex items-start">
    <div class="border-b-1 mb-4 w-full">
      <h3>تنظیمات کلی شبکه</h3>
    </div>
    <div class="flex flex-col w-full py-5">
      <div class="flex items-center justify-between w-full">
        <span class="flex items-center text-mdr">
          <IconMdi:fingerprint
            class="ml-3 cursor-pointer flex"
            aria-hidden="true"
          />
          <span class="flex"> فعال کردن کلید سخت افزاری</span>
        </span>
        <Switch
          v-model="webAuthStatus"
          @click="enableWebauth()"
          :class="webAuthStatus ? 'bg-green-200' : 'bg-gray-200'"
          class="relative inline-flex h-[40px] px-3 w-40 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          <span
            aria-hidden="true"
            :class="webAuthStatus ? 'left-1' : 'right-1'"
            class="pointer-events-none absolute top-[1px] inline-block h-[32px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
          />
          <span class="text-center w-full text-md">
            {{ webAuthStatus ? "فعال" : "غیر فعال" }}
          </span>
        </Switch>
      </div>
      <span class="text-sm text-gray-600 mr-4 flex">
        <IconMdi:help class="flex text-sm" aria-hidden="true" />
        <span class="text-lg"> پاره ای توضیحات </span>
      </span>
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
          v-model="certsGenerated"
          @click="GenerateCerts()"
          :class="certsGenerated ? 'bg-green-200' : 'bg-gray-200'"
          class="relative inline-flex h-[40px] px-3 w-40 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
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
  </div>
</template>

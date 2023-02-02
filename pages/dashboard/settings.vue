<script lang="ts" setup>
const { $SEA, $irisSession, $irisGlobal, $irisPublic } = useNuxtApp();

useHead({
  title: "تنظیمات کلی",
});
definePageMeta({
  middleware: ["owner-auth"],
  layout: "dashboard",
});
const GenerateCerts = async () => {
  const user = $irisSession.getKey();
  const certificate = await $SEA.certify(
    "*", // everyone
    { "#": { "*": "inbox" } },
    user,
    null
  );

  $irisGlobal.get("inbox").get(user.pub).put(true);
  console.log(certificate);
};
const SendDumpInbox = async () => {
  const user = $irisSession.getKey();

  const request = {
    pub: user.pub,
    date: new Date().valueOf(),
  };
  $irisPublic().get("inbox").get("dddddffdd").put(request);
};
</script>
<template>
  <section class="flex flex-col justify-center content-center">
    <h2>تنظیمات کلی</h2>

    <button @click="GenerateCerts()">generate CERTS</button>
    <button @click="SendDumpInbox()">Send Dump Inbox</button>
    <hr />
  </section>
</template>

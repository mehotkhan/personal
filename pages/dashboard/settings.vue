<script lang="ts" setup>
const { $SEA, $irisSession } = useNuxtApp();

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

  console.log(certificate);
};
</script>
<template>
  <section class="flex flex-col justify-center content-center">
    <h2>تنظیمات کلی</h2>

    <button @click="GenerateCerts()">generate CERTS</button>
    <hr />
  </section>
</template>

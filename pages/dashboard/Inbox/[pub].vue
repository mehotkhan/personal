<script lang="ts" setup>
const route = useRoute();

const thisPub = String(route?.params?.pub);
useHead({
  title: "پیام‌ها",
});
definePageMeta({
  middleware: ["owner-auth"],
  layout: "dashboard",
});
</script>
<template>
  <section class="flex flex-col justify-center content-center">
    <div class="flex justify-between items-center border-b-1 pb-5 mt-10">
      <div class="flex items-start flex-col">
        <h3 class="flex text-5xl">صندوق ورودی</h3>
      </div>
      <div class="flex items-center">
        <DashboardGlobalOnlineStatus class="mb-4 bg-black" />
      </div>
    </div>
    <DashboardInboxConversation :pub="thisPub" />
  </section>
</template>

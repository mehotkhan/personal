<script setup lang="ts">
useHead({
  title: "پیام‌ها",
});
const { $irisSession } = useNuxtApp();
const user = $irisSession.getKey();
const isAdmin = ref(false);
const api: string = await $fetch("/check-admin", {
  method: "POST",
  body: {
    pub: user.pub,
  },
});
try {
  const response = JSON.parse(api);
  isAdmin.value = response;
} catch (error) {
  isAdmin.value = false;
  // console.log(error);
}
</script>
<template>
  <section class="flex flex-col justify-center content-center">
    <div class="flex justify-between items-center border-b-1 pb-5 mt-10">
      <div class="flex items-start flex-col">
        <h3 class="flex text-5xl">صندوق ورودی</h3>
      </div>
      <div class="pt-2 px-5 items-center flex min-w-64 h-18 justify-between">
        <SocialUserProfile />
      </div>
    </div>
    <ContactNewRequest />
    <h3 class="text-5xl border-b-1 pb-5 mt-10">درخواست های جدید</h3>
    <ContactOwnerInbox />
    <h3 class="text-5xl border-b-1 pb-5 mt-10">بایگانی پیام‌ها</h3>
    <ContactArchive />
  </section>
</template>

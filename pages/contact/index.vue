<script setup>
useHead({
  title: "پیام‌ها",
});
// definePageMeta({
//   middleware: ["owner-auth"],
// });
</script>
<template>
  <section class="flex flex-col justify-center content-center">
    <div class="flex justify-between items-center border-b-1 pb-5 mt-10">
      <div class="flex items-start flex-col">
        <h3 class="flex text-5xl">صندوق ورودی</h3>
      </div>
      <div class="flex items-center">
        <GlobalOnlineStatus class="" />
      </div>
    </div>
    <ContactNewRequest />
    <h3 class="text-5xl border-b-1 pb-5 mt-10">درخواست های جدید</h3>
    <ContactOwnerInbox />
    <h3 class="text-5xl border-b-1 pb-5 mt-10">بایگانی پیام‌ها</h3>
    <ContactArchive />
  </section>
</template>

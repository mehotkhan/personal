<script lang="ts" setup>
useHead({
  title: " تماس با من",
});
</script>
<template>
  <section class="flex flex-col justify-center content-center">
    <div class="flex justify-between items-center border-b-1 pb-5 mt-10">
      <div class="flex items-start flex-col">
        <h3 class="flex text-5xl">گفتگوی آنلاین</h3>
        <p class="block text-xl text-red-600 mt-3">
          این بخش در حال توسعه است و هنوز قابلیت اجرایی ندارد !!!
        </p>
      </div>
      <div class="flex items-center">
        <SocialGuestProfile class="mb-4 bg-black" />
      </div>
    </div>
    <ContactNewContact />
    <h3 class="text-5xl border-b-1 pb-5 mt-10">بایگانی پیام‌ها</h3>
    <ContactArchive />
  </section>
</template>

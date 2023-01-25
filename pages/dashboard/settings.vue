<script setup>
useHead({
  title: "تنظیمات کلی",
});
definePageMeta({
  middleware: ["owner-auth"],
  layout: "dashboard",
});
</script>
<template>
  <section class="flex flex-col justify-center content-center">
    <h2>تنظیمات کلی</h2>
    <hr />
  </section>
</template>

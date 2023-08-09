<script lang="ts" setup>
useHead({
  title: "صفحه نخست",
});
</script>
<template>
  <section class="flex flex-col">
    <IntroPost />
    <h3 class="border-b pb-3">جدیدترین ورودی‌ها</h3>
    <LatestItems />
  </section>
</template>

<script lang="ts" setup>
useHead({
  title: "صفحه نخست",
});
</script>
<template>
  <section class="flex flex-col">
    <IntroPost service="notes" />
    <h3 class="border-b pb-3">جدیدترین ورودی‌ها</h3>
    <LatestItems service="notes" />
  </section>
</template>

<script setup>
useHead({
  title: "یادداشت‌ها",
});
</script>
<template>
  <section class="flex flex-col justify-center content-center">
    <h3 class="border-b pb-5">جدیدترین یادداشت‌ها</h3>
    <LatestItems service="notes" />
  </section>
</template>

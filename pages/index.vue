<script lang="ts" setup>
useHead({
  title: "صفحه نخست",
});
</script>
<template>
  <section class="flex flex-col">
    <IntroPost />
    <h3>جدیدترین ورودی‌ها</h3>
    <hr />
    <LatestItems />
  </section>
</template>

<script setup>
useHead({
  title: "یادداشت‌ها",
});
</script>
<template>
  <section class="flex flex-col justify-center content-center">
    <ContentDoc path="/pages/notes" />
    <h3>جدیدترین ورودی‌ها</h3>
    <hr />
    <LatestItems service="notes" />
  </section>
</template>

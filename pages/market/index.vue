<script setup>
useHead({
  title: "بازارچه",
});
</script>
<template>
  <section class="flex flex-col justify-center content-center">
    <ContentDoc path="/pages/market" />
    <h3>جدیدترین ورودی‌ها</h3>
    <hr />
    <LatestItems service="market" />
  </section>
</template>

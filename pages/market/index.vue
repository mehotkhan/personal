<script setup>
useHead({
  title: "بازارچه",
});
</script>
<template>
  <section class="flex flex-col justify-center content-center">
    <h3 class="border-b pb-5">جدیدترین محصولات</h3>
    <LatestItems service="market" />
  </section>
</template>

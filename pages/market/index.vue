<script setup>
useHead({
  title: "فروشگاه",
});
</script>
<template>
  <section class="flex flex-col justify-center content-center">
    <ContentDoc path="/pages/market" />
    <p class="text-red-600 text-md font-bo">
      این بخش در حال توسعه است و هنوز قابلیت اجرایی ندارد!
    </p>
    <MarketLatestNft />
    <br />
    <MarketLatestMarket />
    <br />
    <br />
  </section>
</template>
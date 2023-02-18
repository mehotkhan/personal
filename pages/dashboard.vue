<script setup>
useHead({
  title: "دفتر کار من",
});
definePageMeta({
  middleware: ["owner-auth"],
});
</script>
<template>
  <section class="flex flex-col justify-center content-center pb-20">
    <div class="flex justify-between items-center w-full">
      <h3 class="flex">داشبورد</h3>
      <MarketAddNft />
    </div>
    <div class="border-b-1 mb-4 w-full"></div>
    <div class="flex flex-row">
      <div class="basis-2/12 flex items-center">
        <MarketSellingStats />
      </div>
      <div class="basis-5/12 m-1 p-5"><ChartsComments /></div>
      <div class="basis-5/12 m-1 p-5"><ChartsSelling /></div>
    </div>
    <div class="flex">
      <div class="basis-1/2 m-1 p-1">
        <TablesLatestOffer />
      </div>
      <div class="basis-1/2 m-1 p-1">
        <TablesLatestTasks />
      </div>
    </div>
    <div class="flex">
      <div class="basis-1/2 m-1 p-1">
        <TablesLatestComments />
      </div>
      <div class="basis-1/2 m-1 p-1">
        <TablesLatestSelling />
      </div>
    </div>
  </section>
</template>

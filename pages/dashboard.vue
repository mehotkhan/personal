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
    <h2>داشبورد</h2>
    <hr />
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

<script setup>
useHead({
  title: "دفتر کار من",
});
definePageMeta({
  layout: "dashboard",
});
</script>
<template>
  <section class="flex flex-col justify-center content-center pb-20">
    <h2>داشبورد</h2>
    <hr />
    <div class="flex flex-row">
      <div class="basis-2/12 flex items-center">
        <DashboardGlobalSellingStats />
      </div>
      <div class="basis-5/12 m-1 p-5"><DashboardChartsComments /></div>
      <div class="basis-5/12 m-1 p-5"><DashboardChartsSelling /></div>
    </div>
    <div class="flex">
      <div class="basis-1/2 m-1 p-1">
        <DashboardTablesLatestOffer />
      </div>
      <div class="basis-1/2 m-1 p-1">
        <DashboardTablesLatestTasks />
      </div>
    </div>
    <div class="flex">
      <div class="basis-1/2 m-1 p-1">
        <DashboardTablesLatestComments />
      </div>
      <div class="basis-1/2 m-1 p-1">
        <DashboardTablesLatestSelling />
      </div>
    </div>
  </section>
</template>

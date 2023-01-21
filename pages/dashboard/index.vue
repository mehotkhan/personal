<script setup>
useHead({
  title: "دفتر کار من",
});
definePageMeta({
  layout: "dashboard",
});
</script>
<template>
  <section class="flex flex-col justify-center content-center">
    <h2>داشبورد</h2>
    <hr />
    <div class="flex flex-row">
      <div class="basis-2/12 flex items-center	"><DashboardSellingStats /></div>
      <div class="basis-5/12 m-1 p-5"><DashboardCommentsChart /></div>
      <div class="basis-5/12 m-1 p-5"><DashboardSellingChart /></div>
    </div>
    <div class="flex">
      <div class="basis-1/2 m-1 p-1">
        <DashboardComments />
      </div>
      <div class="basis-1/2 m-1 p-1">
        <DashboardProducts />
      </div>
    </div>
  </section>
</template>

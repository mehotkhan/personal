<script setup>
useHead({
  title: "یادداشت‌ها",
});

const items = [
  {
    slot: "latest",
    label: "جدیدترین",
  },
  {
    slot: "hottest",
    label: "پربازدیدترین",
  },
  {
    slot: "comments",
    label: "نظرات",
  },
];
</script>
<template>
  <section class="flex flex-col">
    <IntroPost service="notes" />
    <UTabs :items="items" class="w-full min-h-[30rem]">
      <template #latest="{ item }">
        <LatestItems service="notes" />
      </template>

      <template #hottest="{ item }">
        <LatestItems service="notes" />
      </template>
      <template #comments="{ item }">
        <LatestItems service="notes" />
      </template>
    </UTabs>
  </section>
</template>

<script lang="ts" setup>
const menuItems = [
  {
    title: "صفحه نخست",
    to: "/",
  },
  {
    title: "یادداشت‌ها",
    to: "/notes",
  },
  {
    title: "کتاب‌خانه",
    to: "/books",
  },
  {
    title: "درباره‌من",
    to: "/about",
  },
  {
    title: "تماس‌با‌من",
    to: "/contact",
  },
];
</script>

<template>
  <ul class="flex text-xl justify-between flex-col text-center">
    <li v-for="(menu, index) in menuItems" key="index" class="mb-2">
      <NuxtLink :to="menu.to" class="text-gray-500 hover:text-black">{{
        menu.title
      }}</NuxtLink>
    </li>
  </ul>
</template>

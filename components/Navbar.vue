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
  <ul class="flex text-xl justify-between">
    <li v-for="(menu, index) in menuItems" key="index">
      <NuxtLink :to="menu.to" class="text-gray-500 hover:text-black">{{
        menu.title
      }}</NuxtLink>
    </li>
    <!-- <li>
      <NuxtLink class="text-gray-500 hover:text-black" href="#"
        >یادداشت‌ها
      </NuxtLink>
    </li>
    <li>
      <NuxtLink class="text-gray-500 hover:text-black" href="#"
        >کتاب‌خانه
      </NuxtLink>
    </li>
    <li>
      <NuxtLink class="text-gray-500 hover:text-black" href="#">
        درباره‌من</NuxtLink
      >
    </li>
    <li>
      <NuxtLink class="text-gray-500 hover:text-black" href="#">
        اطلاعات‌تماس</NuxtLink
      >
    </li> -->
  </ul>
</template>

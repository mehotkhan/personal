<script lang="ts" setup>
const menuItems = [
  {
    title: "صفحه‌نخست",
    to: "/",
  },
  {
    title: "پیشنهاد‌همکاری",
    to: "/offer",
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
  <ul class="flex flex-col h-full text-xl justify-start text-center">
    <li
      v-for="(menu, index) in menuItems"
      key="index"
      class="transform -rotate-90 mb-20 md:rotate-0 md:mb-5 md:ml-5"
    >
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
<style lang="scss" scoped>
.router-link-active {
  background: black;
  color: white;
  padding: 2px 5px;
  border-radius: 2px;
}
</style>

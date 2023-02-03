<script lang="ts" setup>
const route = useRoute();

const menuItems = [
  {
    title: "صفحه‌نخست",
    to: "/",
  },

  {
    title: "یادداشت‌ها",
    to: "/notes",
  },
  // {
  //   title: "فروشگاه",
  //   to: "/market",
  // },
  {
    title: "تماس‌با‌من",
    to: "/contact",
  },
  {
    title: "درباره‌من",
    to: "/about",
  },
];
</script>

<template>
  <ul class="w-full">
    <li
      v-for="(menu, index) in menuItems"
      :key="index"
      class="grid py-3 w-full"
    >
      <NuxtLink
        :to="menu.to"
        class="hover:text-black py-2"
        :class="
          menu.to !== '/' && route.path.startsWith(menu.to)
            ? 'router-link-active'
            : ''
        "
        >{{ menu.title }}</NuxtLink
      >
    </li>
  </ul>
</template>
<style lang="scss" scoped>
.router-link-active {
  z-index: 0;
  background: black;
  color: white;
  border-radius: 2px;
}
</style>

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
      key="index"
      class="transform -rotate-90 mb-20 md:rotate-0 md:mb-5 md:ml-5 block"
    >
      <NuxtLink
        :to="menu.to"
        class="hover:text-black"
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
  background: black;
  color: white;
  padding: 2px 5px;
  border-radius: 2px;
}
</style>

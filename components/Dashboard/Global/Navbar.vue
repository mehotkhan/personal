<script lang="ts" setup>
const route = useRoute();

const menuItems = [
  {
    title: "داشبورد",
    to: "/dashboard",
  },
  {
    title: "تماس‌ها",
    to: "/dashboard/inbox",
  },
  {
    title: "دیدگاه‌ها",
    to: "/dashboard/comments",
  },
  {
    title: "تسک‌ها",
    to: "/dashboard/tasks",
  },
  {
    title: "کارها",
    to: "/dashboard/jobs",
  },
  {
    title: "فروشگاه",
    to: "/dashboard/shop",
  },
  {
    title: "آمار",
    to: "/dashboard/charts",
  },
];
</script>

<template>
  <ul class="w-full">
    <li v-for="(menu, index) in menuItems" key="index" class="grid py-3 w-full">
      <NuxtLink
        :to="menu.to"
        class="hover:text-black py-2"
        :class="
          menu.to !== '/dashboard' && route.path.startsWith(menu.to)
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
  border-radius: 2px;
}
</style>

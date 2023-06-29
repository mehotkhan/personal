<script lang="ts" setup>
const appConfig = useAppConfig();

const route = useRoute();
const menuItems = appConfig.menuItems;
</script>

<template>
  <ul class="list-none contents flex-col mt-8">
    <li key="index">
      <NuxtLink
        to="/"
        class="hover:text-black py-1 px-3"
        :class="route.path === '/' ? 'router-link-active' : ''"
        >صفحه‌نخست</NuxtLink
      >
    </li>
    <li v-for="(menu, index) in menuItems" :key="index">
      <NuxtLink
        :to="menu.to"
        class="hover:text-black py-1 px-5"
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
  background: #454545e1;
  color: white;
  border-radius: 3px;
  // text-decoration: underline;
}
</style>

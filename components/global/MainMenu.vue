<script lang="ts" setup>
const appConfig = useAppConfig();
const route = useRoute();
</script>

<template>
  <ul
    v-if="!route.path.startsWith('/manage')"
    class="list-none contents flex-col mt-8"
  >
    <li v-for="(menu, index) in appConfig.menuItems" :key="index">
      <NuxtLink
        :to="menu.to"
        class="hover:text-black py-1 px-5"
        :class="
          menu.to !== '/' && route.path == menu.to ? 'router-link-active' : ''
        "
        >{{ menu.title }}</NuxtLink
      >
    </li>
  </ul>
  <ul v-else-if="isOwner()" class="list-none contents flex-col mt-8">
    <li v-for="(menu, index) in appConfig.manageMenuItems" :key="index">
      <NuxtLink
        :to="menu.to"
        class="hover:text-black py-1 px-5"
        :class="
          menu.to !== '/' && route.path == menu.to ? 'router-link-active' : ''
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

<script lang="ts" setup>
const { $irisSession } = useNuxtApp();
const appConfig = useAppConfig();

const route = useRoute();
const isAdmin = ref(false);
const menuItems = appConfig.menuItems;

onMounted(async () => {
  const user = $irisSession?.getKey();
  const api: string = await $fetch("/check-admin", {
    method: "POST",
    body: {
      pub: user.pub,
    },
  });
  try {
    const response = JSON.parse(api);
    isAdmin.value = response;
  } catch (error) {
    isAdmin.value = false;
    // console.log(error);
  }
});
</script>

<template>
  <ul class="list-none contents flex-col mt-8">
    <li v-if="isDev() || isAdmin" key="dashboard">
      <NuxtLink
        to="/dashboard"
        class="hover:text-black py-1 px-3"
        :class="route.path.startsWith('/dashboard') ? 'router-link-active' : ''"
        >داشبورد</NuxtLink
      >
    </li>
    <li v-else key="index">
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

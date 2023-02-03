<script lang="ts" setup>
const { $irisSession } = useNuxtApp();
const user = $irisSession.getKey();
const route = useRoute();

const isAdmin = ref(false);

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
</script>

<template>
  <ul class="w-full">
    <li v-if="isDev() || isAdmin" key="dashboard" class="grid py-2 w-full">
      <NuxtLink
        to="/dashboard"
        class="hover:text-black py-2 px-5"
        :class="route.path.startsWith('/dashboard') ? 'router-link-active' : ''"
        >داشبورد</NuxtLink
      >
    </li>
    <li
      v-for="(menu, index) in menuItems"
      :key="index"
      class="grid py-2 w-full"
    >
      <NuxtLink
        :to="menu.to"
        class="hover:text-black py-2 px-5"
        :class="
          menu.to !== '/' && route.path.startsWith(menu.to)
            ? 'router-link-active'
            : ''
        "
        >{{ menu.title }}</NuxtLink
      >
    </li>
    <li v-if="isDev() || isAdmin" key="settings" class="grid py-2 w-full">
      <NuxtLink
        to="/settings"
        class="hover:text-black py-2 px-5"
        :class="route.path.startsWith('/settings') ? 'router-link-active' : ''"
        >تنظیمات</NuxtLink
      >
    </li>
  </ul>
</template>
<style lang="scss" scoped>
.router-link-active {
  background: #454545e1;
  color: white;
}
</style>

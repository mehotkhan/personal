<script lang="ts" setup>
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
const { $irisSession, $irisPublic } = useNuxtApp();
const myName = ref("");

onMounted(() => {
  $irisPublic()
    .get("profile")
    .get("name")
    .on((name: string) => {
      myName.value = name;
    });
});

const logout = async () => {
  await $irisSession.logOut();
  window.location.reload();
};
</script>

<template>
  <Menu as="div" class="relative">
    <MenuButton
      class="pt-1 flex items-center hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
    >
      <span class="text-thin flex ml-2"> :// </span>
      {{ myName }}
      <IconUil:angle-down class="text-lg mr-1" />
    </MenuButton>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems
        class="absolute left-0 top-10 p-1 mt-2 w-56 origin-top-left bg-gray-200 z-10 border-b-1 border-gray-200 h"
      >
        <MenuItem key="edit-profile" class="px-2 py-2">
          <nuxt-link
            to="/profile"
            class="hover:underline cursor-pointer flex items-center"
          >
            <IconUil:user class="ml-2 flex" />
            پروفایل کاربری
          </nuxt-link>
        </MenuItem>
        <MenuItem key="webauth" class="px-2 py-2 flex">
          <SocialWebAuthLogin />
        </MenuItem>
        <MenuItem key="logout" class="px-2 py-2 flex" @click="logout()">
          <span class="hover:underline cursor-pointer flex items-center">
            <IconUil:exit class="ml-2 flex" />

            خروج
          </span>
        </MenuItem>
      </MenuItems>
    </transition>
  </Menu>
</template>

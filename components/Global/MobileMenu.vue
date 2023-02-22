<script lang="ts" setup>
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";

const appConfig = useAppConfig();
const route = useRoute();
const isOwner = await useOwner();

const menuItems = appConfig.menuItems;
</script>

<template>
  <Menu as="div" class="relative inline-block flex items-center">
    <MenuButton
      class="inline-flex w-full text-md hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
    >
      <IconUil:align-justify />
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
        class="absolute right-0 top-10 p-1 mt-2 w-56 origin-top-right bg-gray-200 z-10 border-b-1 border-gray-200 h"
      >
        <MenuItem
          v-if="isDev() || isOwner"
          key="dashboard"
          v-slot="{ active }"
          class=""
        >
          <NuxtLink
            to="/dashboard"
            class="hover:underline"
            :class="[
              active ? 'bg-gray-200' : 'text-gray-900',
              route.path.startsWith('/dashboard') ? 'router-link-active' : '',
              ' flex w-full items-center px-2 py-2 ',
            ]"
            >داشبورد</NuxtLink
          >
        </MenuItem>
        <MenuItem
          v-for="(menu, index) in menuItems"
          :key="index"
          v-slot="{ active }"
          class=""
        >
          <NuxtLink
            :to="menu.to"
            class="hover:underline"
            :class="[
              active ? 'bg-gray-200' : 'text-gray-900',
              menu.to !== '/' && route.path.startsWith(menu.to)
                ? 'router-link-active'
                : '',
              ' flex w-full items-center px-2 py-2 ',
            ]"
            >{{ menu.title }}</NuxtLink
          >
        </MenuItem>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
const { $irisSession } = useNuxtApp();
const user = $irisSession.getKey();
const isAdmin = ref(false);
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
  <Menu v-if="isDev() || isAdmin" as="div" class="relative inline-block">
    <MenuButton class="inline-flex w-full justify-center">
      <div class="flex items-center justify-center">
        <IconUil:angle-down class="" />
        <span class="text-md mr-1 flex items-center">
          <span class="flex">
            وضعیت:
            <b class="mr-2">آنلاین</b>
          </span>
          <span
            class="block mr-1 align-text-bottom w-3 h-3 bg-green-400 rounded-full border-2 border-green-300"
          >
          </span>
        </span>
      </div>
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
        class="absolute top-7 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-sm bg-white shadow-sm ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div class="px-1 py-1">
          <MenuItem v-slot="{ active }">
            <button
              :class="[
                active ? 'bg-gray-200 text-black' : 'text-black',
                'group flex w-full items-center rounded-sm px-2 py-2 text-md',
              ]"
            >
              <IconUil:headphone-slash
                :active="active"
                class="ml-2 h-5 w-5"
                aria-hidden="true"
              />
              تغیر وضعیت
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
  <div v-else>
    <span class="text-md mr-0 flex items-center">
      <span class="flex">
        وضعیت:
        <b class="mr-2">آنلاین</b>
      </span>
      <span
        class="block mr-1 align-text-bottom w-3 h-3 bg-green-400 rounded-full border-2 border-green-300"
      >
      </span>
    </span>
  </div>
</template>

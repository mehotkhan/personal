<script lang="ts" setup>
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
const { $irisSession } = useNuxtApp();
const editIsOpen = ref(false);
const user = $irisSession.getKey();
const isAdmin = ref(false);

const openEditModal = () => {
  editIsOpen.value = true;
};
const closeEditModal = () => {
  editIsOpen.value = false;
};

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
  <div>
    <Menu as="div" class="relative flex">
      <MenuButton
        class="flex items-center w-full text-md hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        <IconUil:setting />
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
          <MenuItem
            key="edit-profile"
            v-slot="{ active }"
            class="px-2 py-2 flex items-center"
            @click="openEditModal"
          >
            <span
              class="hover:underline cursor-pointer"
              :class="[active ? 'bg-gray-200' : 'text-gray-900']"
            >
              <IconUil:user class="ml-2 text-md" />
              ویرایش اطلاعات کاربری
            </span>
          </MenuItem>
          <MenuItem key="logout" v-slot="{ active }" class="px-2 py-2 flex">
            <span
              class="hover:underline cursor-pointer"
              :class="[active ? 'bg-gray-200' : 'text-gray-900']"
            >
              <IconUil:exit class="ml-2 text-sm" />

              خروج
            </span>
          </MenuItem>
        </MenuItems>
      </transition>
    </Menu>
    <SocialUpdateProfile :is-open="editIsOpen" @close-modal="closeEditModal" />
  </div>
</template>

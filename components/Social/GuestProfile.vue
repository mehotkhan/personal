<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";

const { $irisPublic } = useNuxtApp();
const userName = ref("نام کاربری");
if ($irisPublic) {
  $irisPublic()
    .get("profile")
    .get("name")
    .on((name: string) => {
      userName.value = name;
    });
}
const editIsOpen = ref(false);
const openEditModal = () => {
  editIsOpen.value = true;
};
const closeEditModal = () => {
  editIsOpen.value = false;
};
</script>

<template>
  <Menu as="div" class="h-10 flex items-center	relative">
    <div>
      <MenuButton class="inline-flex">
        <div class="flex items-center justify-center">
          <img
            class="w-6 h-6 rounded-full"
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
            alt="Avatar of Jonathan Reinink"
          />
          <span class="mr-2 text-sm font-normal">{{ userName }} </span>
          <IconUil:angle-down class="mr-2 text-sm" />
        </div>
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems
        class="text-sm absolute top-8 left-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-sm bg-white shadow-sm ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div class="px-1 py-1">
          <MenuItem v-slot="{ active }">
            <button
              :class="[
                active ? 'bg-gray-200 text-black' : 'text-black',
                'group flex w-full items-center rounded-sm px-2 py-2 text-md',
              ]"
              @click="openEditModal"
            >
              <IconUil:edit
                :active="active"
                class="ml-2 h-5 w-5"
                aria-hidden="true"
              />
              ویرایش اطلاعات کاربری
            </button>
          </MenuItem>
          <MenuItem v-slot="{ active }">
            <button
              :class="[
                active ? 'bg-gray-200 text-black' : 'text-black',
                'group flex w-full items-center rounded-sm px-2 py-2 text-md',
              ]"
            >
              <IconUil:enter
                :active="active"
                class="ml-2 h-5 w-5"
                aria-hidden="true"
              />
              تغییر پروفایل
            </button>
          </MenuItem>
          <MenuItem v-slot="{ active }">
            <button
              :class="[
                active ? 'bg-gray-200 text-black' : 'text-black',
                'group flex w-full items-center rounded-sm px-2 py-2 text-md',
              ]"
            >
              <IconUil:exit
                :active="active"
                class="ml-2 h-5 w-5"
                aria-hidden="true"
              />
              خروج
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
  <SocialGuestSettings :is-open="editIsOpen" @closeModal="closeEditModal" />
</template>

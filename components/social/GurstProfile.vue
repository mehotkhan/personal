<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
const { $irisSession } = useNuxtApp();
const user = $irisSession.getKey();
const route = useRoute();

const isAdmin = ref(false);
onMounted(async () => {
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
const editIsOpen = ref(false);
const openEditModal = () => {
  editIsOpen.value = true;
};
const closeEditModal = () => {
  editIsOpen.value = false;
};
</script>

<template>
  <div v-if="isDev() || isAdmin">
    <Menu as="div" class="relative inline-block w-full">
      <MenuButton class="inline-flex w-full justify-start items-center">
        <IconUil:dashboard class="ml-2 text-md font-thin" />
        <span class="text-xl md:text-2xl">داشبورد</span>
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
          class="absolute top-7 right-6 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-sm bg-white shadow-sm ring-1 ring-black ring-opacity-5 focus:outline-none z-100"
        >
          <div class="px-1 py-1">
            <MenuItem v-slot="{ active }">
              <NuxtLink
                v-if="route?.path?.startsWith('/dashboard')"
                to="/"
                class="flex"
                :class="[
                  active ? 'bg-gray-200 text-black' : 'text-black',
                  'group flex w-full items-center rounded-sm px-2 py-2 text-md ',
                ]"
              >
                <IconUil:home
                  :active="active"
                  class="ml-2 h-5 w-5"
                  aria-hidden="true"
                />
                بازگشت به خانه
              </NuxtLink>
              <NuxtLink
                v-else
                class="flex"
                :class="[
                  active ? 'bg-gray-200 text-black' : 'text-black',
                  'group flex w-full items-center rounded-sm px-2 py-2 text-md ',
                ]"
                to="/dashboard"
              >
                <IconUil:dashboard
                  :active="active"
                  class="ml-2 h-5 w-5"
                  aria-hidden="true"
                />
                داشبورد
              </NuxtLink>
            </MenuItem>
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
    <DashboardGlobalUpdateProfile
      :is-open="editIsOpen"
      @closeModal="closeEditModal"
    />
  </div>
  <FrontOnlineStatus v-else />
</template>

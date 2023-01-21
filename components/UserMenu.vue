<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { ref } from "vue";
// const { $irisPublic } = useNuxtApp();
const route = useRoute();

// const userName = ref("نام کاربری");
// if ($irisPublic) {
//   $irisPublic()
//     .get("profile")
//     .get("name")
//     .on((name: string) => {
//       userName.value = name;
//     });
// }
const editIsOpen = ref(false);
const openEditModal = () => {
  editIsOpen.value = true;
};
const closeEditModal = () => {
  editIsOpen.value = false;
};
</script>

<template>
  <div>
    <Menu as="div" class="relative inline-block">
      <div>
        <MenuButton
          class="inline-flex w-full justify-center bg-opacity-20 px-4 py-2 text-md font-medium hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          <div class="flex items-center justify-center">
            <IconUil:angle-down class="mr-2" />
            <span class="ml-2 text-md font-normal">کاربر عزیز خوش آمدید!</span>
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
          class="absolute top-7 right-6 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-sm bg-white shadow-sm ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div class="px-1 py-1">
            <MenuItem v-slot="{ active }">
              <button
                :class="[
                  active ? 'bg-gray-200 text-black' : 'text-black',
                  'group flex w-full items-center rounded-sm px-2 py-2 text-md ',
                ]"
              >
                <NuxtLink
                  to="/"
                  v-if="route?.path?.startsWith('/dashboard')"
                  class="flex"
                >
                  <IconUil:home
                    :active="active"
                    class="ml-2 h-5 w-5"
                    aria-hidden="true"
                  />
                  بازگشت به خانه
                </NuxtLink>
                <NuxtLink class="flex" to="/dashboard" v-else>
                  <IconUil:dashboard
                    :active="active"
                    class="ml-2 h-5 w-5"
                    aria-hidden="true"
                  />
                  داشبورد
                </NuxtLink>
              </button>
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
    <UpdateProfile :is-open="editIsOpen" @closeModal="closeEditModal" />
  </div>
</template>

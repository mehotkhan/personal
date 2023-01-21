<script lang="ts" setup>
const route = useRoute();

const sideMenu = ref(true);
const close = () => {
  sideMenu.value = false;
};
const open = () => {
  sideMenu.value = true;
};
</script>

<template>
  <div class="p-3 md:p-10 min-w-screen">
    <slot name="app-before" />
    <div id="app-before"></div>
    <main
      class="border border-gray-300 rounded-sm shadow-lg bg-white flex container min-h-screen p-0"
    >
      <div
        class="bg-gray-200 px-0 flex flex-col justify-start relative transition-all"
        :class="sideMenu ? 'w-1/6 md:w-2/6 md:p-10' : 'w-0 md:w-0 md:p-0'"
      >
        <div v-if="sideMenu" class="h-full">
          <UserMenu
            class="absolute top-6 right-0 rounded-md w-full hidden md:block z-100"
          />
          <div>
            <NuxtLink
              to="/"
              class="mt-15 text-center text-xl md:text-2xl text-thin border-b border-gray-400 w-full bg-black text-white rounded p-3 block mb-10"
            >
              علی زِمانی:// طراح و توسعه دهنده وب
            </NuxtLink>
            <h4
              class="text-xl md:text-2xl text-bold pb-2 my-5 border-b border-dashed border-gray-400"
            >
              فهرست‌اصلی
            </h4>
            <Navbar
              class="mt-10 flex flex-col h-full text-xl md:text-xl justify-start text-gray-500 text-right"
            />
          </div>
          <div
            class="pt-10 h-auto md:h-auto md:pt-10 logo-area sticky top-3 md:top-0"
          >
            <ContentToc :key="route?.path" />
          </div>
        </div>
      </div>
      <div
        class="px-10 md:px-20 pb-0 w-content relative transition-all"
        :class="sideMenu ? 'w-5/6 md:w-5/6 ' : 'w-full'"
      >
        <div
          class="z-100 absolute top-5 right-0 cursor-pointer text-black text-xl md:text-3xl"
        >
          <IconIcRoundMenuOpen
            v-if="!sideMenu"
            @click="open"
            class="absolute right-5"
          />
          <IconIcRoundMenuOpen
            v-if="sideMenu"
            @click="close"
            class="transform rotate-180 absolute -right-15"
          />
        </div>
        <div
          class="content-area prose-md lg:prose-2xl w-full font-normal py-10"
        >
          <slot />
        </div>
      </div>
      <slot name="app-after" />
      <div id="app-after"></div>
    </main>
  </div>
</template>

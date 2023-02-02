<script lang="ts" setup>
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
    <main class="rounded-sm shadow-md bg-white flex container min-h-screen p-0">
      <div
        class="bg-gray-200 px-0 flex flex-col justify-start relative transition-all"
        :class="sideMenu ? 'w-1/6 md:w-2/6 md:p-10' : 'w-0 md:w-0 md:p-0'"
      >
        <div v-if="sideMenu" class="h-full">
          <DashboardGlobalUserMenu
            class="absolute top-7 z-100 right-5 hidden md:flex"
          />

          <div
            class="pt-10 h-auto md:h-auto md:pt-10 logo-area sticky top-15 md:top-0"
          >
            <FrontLogoArea />
            <FrontNavbar
              class="flex flex-col h-full text-xl md:text-2xl justify-start text-gray-500 text-center"
            />
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
            class="absolute right-5"
            @click="open"
          />
          <IconIcRoundMenuOpen
            v-if="sideMenu"
            class="transform rotate-180 absolute -right-15"
            @click="close"
          />
        </div>
        <div class="w-full py-10">
          <slot />
        </div>
      </div>
      <slot name="app-after" />
      <div id="app-after"></div>
    </main>
  </div>
</template>

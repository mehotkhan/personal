<script lang="ts" setup>
import { useStorage } from "@vueuse/core";
const defaultSideMenu = true;
const sideMenu = useStorage("sideMenu", defaultSideMenu);

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
      class="rounded-sm relative shadow-md bg-white flex container min-h-screen p-0"
    >
      <div
        class="z-100 absolute pt-2 px-5 items-center top-0 right-0 flex w-64 h-18 justify-between text-gray-500 bg-gray-200"
      >
        <GlobalOnlineStatus />
        <div class="cursor-pointer text-2xl">
          <IconIcRoundMenuOpen v-if="!sideMenu" class="right-5" @click="open" />
          <IconIcRoundMenuOpen
            v-if="sideMenu"
            class="transform rotate-180"
            @click="close"
          />
        </div>
      </div>
      <div
        class="bg-gray-200 pt-15 flex flex-col justify-start relative transition-all py-10"
        :class="sideMenu ? 'w-1/6 md:w-2/12' : 'w-0 md:w-0 md:p-0'"
      >
        <div v-if="sideMenu" class="h-full text-gray-500">
          <div class="h-auto logo-area sticky top-2">
            <GlobalLogoArea />
            <GlobalMainMenu
              class="flex flex-col h-full text-xl md:text-2xl justify-start"
            />
          </div>
        </div>
      </div>
      <div
        class="px-10 md:px-20 pb-0 w-content relative transition-all"
        :class="sideMenu ? 'w-5/6 md:w-5/6 ' : 'w-full'"
      >
        <div class="nuxt-content content-area prose-xl w-full font-normal">
          <slot />
        </div>
      </div>
      <slot name="app-after" />
      <div id="app-after"></div>
    </main>
  </div>
</template>

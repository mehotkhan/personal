<script lang="ts" setup>
const route = useRoute();
const sideMenu = ref(true);
const singleMode = ref(true);
const close = () => {
  sideMenu.value = false;
};
const open = () => {
  sideMenu.value = true;
};

const isSingle = (path: string) =>
  ["/tuts/", "/notes/", "/books/"].some((word) => path.startsWith(word)) ??
  false;

onMounted(() => {
  if (isSingle(route.fullPath)) {
    singleMode.value = true;
  } else {
    singleMode.value = false;
  }
});
watch(route, (newRoute, oldRoute) => {
  if (isSingle(newRoute.fullPath)) {
    singleMode.value = true;
  } else {
    singleMode.value = false;
  }
});
</script>

<template>
  <div class="p-3 md:p-10 min-w-screen">
    <slot name="app-before" />
    <div id="app-before"></div>
    <main
      class="border border-gray-300 rounded-sm shadow-lg bg-white flex container min-h-screen p-0"
    >
      <div
        class="px-10 md:px-20 pb-0 w-content overflow-x-hidden relative transition-all"
        :class="sideMenu ? 'w-5/6 md:w-5/6 ' : 'w-full'"
      >
        <IconIcBaselineMenu
          v-if="!sideMenu"
          @click="open"
          class="z-100 absolute top-10 left-10 cursor-pointer text-black text-xl md:text-3xl"
        />
        <IconIcRoundMenuOpen
          v-if="sideMenu"
          @click="close"
          class="z-100 absolute top-10 left-10 cursor-pointer text-black text-xl md:text-3xl"
        />
        <div
          class="content-area rtl prose-md lg:prose-2xl w-full font-normal py-10"
        >
          <slot />
        </div>
      </div>

      <div
        class="bg-gray-200 px-0  flex flex-col justify-start relative transition-all"
        :class="sideMenu ? 'w-1/6 md:w-2/6 md:p-10' : 'w-0 md:w-0 md:p-0'"
      >
        <div v-if="sideMenu" class="h-full">
          <OnlineStatus v-if="!singleMode" />
          <div
            class="pt-10 h-auto md:h-auto md:pt-10 sticky top-3 md:top-0 logo-area"
          >
            <LogoArea v-if="!singleMode" />
            <ContentToc v-if="singleMode" />
            <Navbar
              v-if="!singleMode"
              class="flex flex-col h-full text-xl md:text-2xl justify-start text-gray-500 text-center"
            />
          </div>
        </div>
      </div>
      <slot name="app-after" />
      <div id="app-after"></div>
    </main>
  </div>
</template>

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

const isSingle = (path: string) => /\/notes\/[a-zA-Z]/.test(path);

onMounted(() => {
  if (isSingle(route.path)) {
    singleMode.value = true;
  } else {
    singleMode.value = false;
  }
});
watch(route, (newRoute, oldRoute) => {
  if (isSingle(newRoute.path)) {
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
        class="bg-gray-200 px-0 flex flex-col justify-start relative transition-all py-10"
        :class="sideMenu ? 'w-1/6 md:w-2/12' : 'w-0 md:w-0 md:p-0'"
      >
        <div v-if="sideMenu" class="h-full">
          <UserMenu
            class="absolute top-5 right-0 rounded-md w-full hidden md:block z-100"
          />
          <div class="pt-10 h-auto md:h-auto md:pt-10">
            <DashboardNavbar
              class="flex flex-col h-full text-xl md:text-2xl justify-start text-gray-500 text-center"
            />
          </div>
        </div>
      </div>
      <div
        class="px-10 pb-0 w-content relative transition-all"
        :class="sideMenu ? 'w-5/6 md:w-10/12 ' : 'w-full'"
      >
        <div
          class="z-100 absolute top-5 right-0 cursor-pointer text-black text-xl md:text-2xl"
        >
          <IconIcRoundMenuOpen
            v-if="!sideMenu"
            @click="open"
            class="absolute right-5"
          />
          <IconIcRoundMenuOpen
            v-if="sideMenu"
            @click="close"
            class="transform rotate-180 absolute -right-4"
          />
        </div>
        <div class="prose-lg w-full font-normal py-0">
          <slot />
        </div>
      </div>
      <slot name="app-after" />
      <div id="app-after"></div>
    </main>
  </div>
</template>

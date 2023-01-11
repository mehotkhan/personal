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
    <main
      class="border border-gray-300 rounded-sm shadow-lg bg-white flex container min-h-screen p-0"
    >
      <div
        class="p-10 md:p-20 w-content overflow-x-hidden relative transition-all"
        :class="sideMenu ? 'w-5/6 md:w-5/6 ' : 'w-full'"
      >
        <IconIcBaselineMenu
          v-if="!sideMenu"
          @click="open"
          class="absolute top-10 left-10 cursor-pointer text-black text-xl md:text-3xl"
        />
        <IconIcRoundMenuOpen
          v-if="sideMenu"
          @click="close"
          class="absolute top-10 left-10 cursor-pointer text-black text-xl md:text-3xl"
        />
        <div class="rtl prose">
          <slot />
        </div>
      </div>

      <div
        class="bg-gray-100 px-0 md:p-10 flex flex-col justify-start relative transition-all overflow-hidden"
        :class="sideMenu ? 'w-1/6 md:w-2/6' : 'w-0 md:w-0 md:p-0'"
      >
        <OnlineStatus />
        <div class="pt-10 h-150 md:h-auto md:pt-20 sticky top-8">
          <LogoArea />
          <div
            class="h-1 w-full mb-10 border-2 xsm border-1 border-dashed border-gray-200"
          ></div>
          <Navbar />
        </div>
      </div>
      <slot name="app-after" />
      <div id="app-after"></div>
    </main>
  </div>
</template>
<style global lang="postcss">
.prose {
  max-width: fit-content;
  a {
    text-decoration: none;
  }
  hr {
    margin-top: 1em;
    margin-bottom: 1em;
  }
}
.prose + :is(h1, h2, h3),
.prose > :is(h1, h2, h3):not(:first-child) {
  @apply mt-6;
}
.prose h1 {
  @apply text-3xl font-extrabold tracking-tight;
}
.prose h2 {
  @apply text-2xl font-semibold tracking-tight;
}
.prose h3 {
  @apply text-xl font-bold tracking-tight;
}
.prose h2 a,
.prose h3 a {
  @apply no-underline ease-all;
  &:hover {
    @apply border-neutral-600 dark:border-neutral-300;
  }
}
:is(.prose, p) > svg {
  @apply inline-block align-bottom;
}
.rtl .prose blockquote {
  border-right-width: 0.25rem;
  border-left-width: 0;
}
.rtl.prose ul > li,
.rtl.prose ol > li {
  padding-right: 1.75em;
  padding-left: 0;
}
.rtl.prose ol > li:before {
  right: 0.25em;
  left: auto;
}
.rtl.prose ol > li:before,
.rtl.prose ul > li:before {
  right: 0.25em;
  left: auto;
}

.rtl.prose thead td:first-child,
.rtl.prose thead th:first-child {
  padding-right: 0;
}

.rtl.prose thead td:last-child,
.rtl.prose thead th:last-child {
  padding-left: 0;
}
</style>

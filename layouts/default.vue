<template>
  <div class="min-w-screen relative">
    <slot name="app-before" />
    <div id="app-before"></div>
    <header
      class="fixed w-full top-0 bg-gray-200 z-10 border-b-1 border-gray-200"
    >
      <div class="flex container justify-between items-center py-4">
        <div class="flex items-center">
          <MobileMenu class="text-md lg:hidden" />
          <LogoArea />
          <MainMenu class="text-md hidden md:text-sm lg:contents" />
        </div>
        <Social class="flex items-center" />
      </div>
    </header>
    <main class="bg-white flex container min-h-screen md:mt-20">
      <div class="nuxt-content content-area prose-xl w-full font-normal px-20">
        <slot />
      </div>
      <slot name="app-after" />
      <div id="app-after"></div>
    </main>
  </div>
</template>

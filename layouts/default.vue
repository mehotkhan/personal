<template>
  <div class="min-w-screen relative">
    <slot name="app-before" />
    <div id="app-before"></div>
    <header class="fixed w-full top-0 bg-gray-200">
      <div class="flex container justify-between py-5">
        <!-- <GlobalOnlineStatus /> -->
        <div class="flex items-center">
          <GlobalLogoArea />
          <GlobalMainMenu class="text-md" />
        </div>
        <div class="flex">
          <SocialUserProfile />
        </div>
      </div>
    </header>
    <main class="bg-white flex container min-h-screen mt-20">
      <div class="nuxt-content content-area prose-xl w-full font-normal px-20">
        <slot />
      </div>
      <slot name="app-after" />
      <div id="app-after"></div>
    </main>
  </div>
</template>

<template>
  <div class="py-10 min-w-screen">
    <slot name="app-before" />
    <div id="app-before"></div>
    <main
      class="border border-gray-300 rounded-sm shadow-lg my-10 bg-white flex px-0 container min-h-screen my-auto"
    >
      <div class="w-4/6 p-20 content overflow-x-hidden">
        <slot />
      </div>

      <div class="w-1/2 bg-gray-100 px-30 flex flex-col justify-start relative">
        <OnlineStatus />
        <div class="pt-50">
          <LogoArea />
          <div
          class="h-1 w-full mb-10 border-2 border-dashed border-gray-200"
          ></div>
          <Navbar />
        </div>
      </div>
      <slot name="app-after" />
      <div id="app-after"></div>
    </main>
  </div>
</template>

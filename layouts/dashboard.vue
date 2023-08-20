<template>
  <div class="flex-col flex">
    <slot name="app-before" />
    <div id="app-before"></div>
    <header
      class="fixed w-full top-0 bg-white z-10 border-b-2 border-gray-200 shadow-sm"
    >
      <div class="flex justify-between items-center py-4 px-[3rem]">
        <div class="flex items-center">
          <DashboardNavbar class="text-md hidden md:text-sm lg:contents" />
          <!-- <Notifications /> -->
        </div>
        <div class="flex gap-3">
          <MobileMenu class="text-md lg:hidden" />
          <Social class="items-center hidden md:flex" />
        </div>
      </div>
    </header>
    <Suspense>
      <section class="flex bg-gray-100 pb-[2rem] pt-[7rem] px-[3rem]">
        <aside class="basis-1/12 mx-3">
          <DashboardAppsMenu class="sticky top-[7rem]" />
        </aside>

        <div class="basis-11/12 flex min-h-screen">
          <slot />
        </div>
      </section>
    </Suspense>
    <SupportStart />
  </div>
</template>

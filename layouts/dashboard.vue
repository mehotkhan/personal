<script setup lang="ts">
const { isPublicMember } = useMembers()

watch(isPublicMember, (incoming) => {
  if (!incoming) {
    navigateTo('/auth')
  }
})
</script>
<template>
  <div>
    <slot name="app-before" />
    <div id="app-before"></div>
    <slot name="header">
      <SocialNavbar class="bg-white px-[3rem]" />
    </slot>
    <Suspense>
      <section
        class="flex bg-gray-100 pb-[2rem] pt-[7rem] px-[3rem] h-screen overflow-hidden"
      >
        <aside v-if="isPublicMember" class="basis-1/12 mx-3">
          <SocialAppsMenu />
        </aside>

        <div
          class="px-4 relative"
          :class="isPublicMember ? 'mx-0 basis-11/12' : 'mx-auto basis-9/12'"
        >
          <slot />
        </div>
      </section>
    </Suspense>

    <slot name="app-after" />
    <div id="app-after"></div>
  </div>
</template>
<style>
::-webkit-scrollbar {
  width: 17px;
}
::-webkit-scrollbar-track {
  position: absolute;
  left: 0 !important;
  background: transparent;
  border-left: 1px solid transparent;
}
::-webkit-scrollbar-thumb {
  border: 4px solid transparent;
  background-clip: padding-box;
  border-radius: 9999px;
  background-color: #ebebeb;
}
::-webkit-scrollbar-thumb:hover {
  background-color: #ddd;
}
</style>

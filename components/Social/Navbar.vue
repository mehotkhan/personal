<script lang="ts" setup>
const navbar = ref(null);
const route = useRoute();
const { isPublicMember } = useMembers();

// lifecycle
onMounted(() => {
  if (!navbar.value) return;

  const { onScroll } = useSticky(navbar.value, 0);
  setTimeout(() => onScroll(), 50);
});

const { profile } = useUser();
</script>

<template>
  <div
    :key="profile.pub"
    ref="navbar"
    class="navbar fixed top-0 z-40 w-full py-2"
  >
    <div class="relative flex items-center">
      <div
        id="main-menu"
        class="mx-15 flex items-center justify-between w-full"
      >
        <div class="flex items-center justify-between w-full ml-[2rem]">
          <div class="flex items-center w-93">
            <NuxtLink
              :external="true"
              tag="a"
              class="flex-none ml-3"
              to="/#intro"
            >
              <ProfileUserAvatar :pub="profile.pub" size="md" />
            </NuxtLink>
            <div class="flex flex-col w-[20rem]">
              <NuxtLink tag="a" class="flex-none ml-3" to="/social">
                <div class="text-xl">
                  <span class="text-orange">سلام، </span>
                  <ProfileUserName
                    :pub="profile.pub"
                    class="contents"
                    :support="true"
                  />
                </div>
                <div class="text-gray-400 text-xs">
                  {{ `  به شبکه اجتماعی نسل نوین خوش آمدید :)` }}
                </div>
              </NuxtLink>
            </div>
          </div>
          <div
            v-if="route.path.startsWith('/social')"
            class="flex relative w-full justify-around"
          >
            <SocialStreamTabs class="w-full text-xl" />
            <SocialStreamFilters class="w-70" />
          </div>
          <div
            v-else-if="route.path.startsWith('/manage')"
            class="flex relative w-full justify-start"
          >
            <ManageNavbar class="w-full text-xl" />
          </div>
        </div>

        <div class="flex dark:border-gray-50/[0.2] items-center">
          <!-- <ThemeSwitcher /> -->

          <ProfileUserNav v-if="isPublicMember" />
          <!-- <LanguageSwitcher /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.navbar {
  z-index: 999;
  .logo {
    max-height: 115px;
  }
  &.sticky-menu {
    background: white;
    box-shadow: 0px 10px 40px 0px rgba(47, 47, 47, 0.1);
    transition:
      background 0.3s,
      border 0.3s,
      border-radius 0.3s,
      box-shadow 0.3s;
  }
}
.slide-fade-from-up-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-from-up-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-from-up-enter-from,
.slide-fade-from-up-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>

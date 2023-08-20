<script setup>
const route = useRoute();
const appConfig = useAppConfig();
const isSuperuser = () => {
  return true;
};
</script>
<template>
  <UCard>
    <ul class="flex-col items-center justify-start space-y-5 w-full list-none">
      <li v-for="(menu, index) in appConfig.dashMenuItems" :key="index">
        <NuxtLink
          class="flex items-center justify-start w-full cursor-pointer"
          :to="menu.to"
        >
          <UIcon :name="menu.icon" class="text-xl" />

          <h3 class="text-md flex mr-5">{{ menu.title }}</h3>
        </NuxtLink>
      </li>
    </ul>
  </UCard>
</template>
<style scoped lang="scss">
.router-link-active {
  position: relative;
  color: black;
  &:before {
    position: absolute;
    content: "";
    width: 5px;
    height: 100%;
    background: #ddd;
    right: -13px;
  }
}
</style>

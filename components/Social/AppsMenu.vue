<script setup>
const route = useRoute();

const isSuperuser = () => {
  return true;
};
</script>
<template>
  <UCard>
    <ul class="flex-col items-center justify-start space-y-5 w-full">
      <li>
        <NuxtLink
          class="flex items-center justify-start w-full cursor-pointer"
          to="/social"
          :class="
            route.path.startsWith('/social/p') ? 'router-link-active' : ''
          "
        >
          <IconUil:coffee class="text-xl text-orange" aria-hidden="true" />
          <h3 class="text-sm flex mr-5">خانه</h3>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          class="flex items-center justify-start w-full cursor-pointer"
          to="/social/g"
          :class="
            route.path.startsWith('/social/g') ? 'router-link-active' : ''
          "
        >
          <IconUil:comments class="text-xl text-orange" aria-hidden="true" />
          <h3 class="text-sm flex mr-5">گروه‌ها</h3>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          class="flex items-center justify-start w-full cursor-pointer"
          to="/social/u/me"
        >
          <IconUil:user class="text-xl text-orange" aria-hidden="true" />
          <h3 class="text-sm flex mr-5">پروفایل</h3>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          class="flex items-center justify-start w-full cursor-pointer"
          to="/social/chats"
        >
          <IconUil:envelope-alt
            class="text-xl text-orange"
            aria-hidden="true"
          />
          <h3 class="text-sm flex mr-5">پیام‌رسان</h3>
        </NuxtLink>
      </li>
      <hr />
      <li>
        <NuxtLink
          class="flex items-center justify-start w-full cursor-pointer"
          to="/social/support"
        >
          <IconUil:comment-question
            class="text-xl text-orange"
            aria-hidden="true"
          />
          <h3 class="text-sm flex mr-5">پشتیبانی</h3>
        </NuxtLink>
      </li>
      <li v-if="isSuperuser()">
        <NuxtLink
          class="flex items-center justify-start w-full cursor-pointer"
          to="/manage"
          :class="route.path.startsWith('/manage') ? 'router-link-active' : ''"
        >
          <IconUil:setting class="text-xl text-orange" aria-hidden="true" />
          <h3 class="text-sm flex mr-5">مدیریت</h3>
        </NuxtLink>
      </li>
    </ul>
  </UCard>
</template>
<style scoped>
.router-link-active {
  border-right: 5px solid #dc780a;
  margin-right: -10px;
  padding-right: 5px;
}
</style>

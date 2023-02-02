<script setup lang="ts">
const props = defineProps({
  pub: { type: String, required: true, default: "" },
});
const { $irisPublic } = useNuxtApp();
const userName = ref("نام کاربری");
if ($irisPublic) {
  $irisPublic(props.pub)
    .get("profile")
    .get("name")
    .on((name: string) => {
      userName.value = name;
    });
}
</script>

<template>
  <div class="flex items-center group min-w-200">
    <IconMdi:user class="text-lg mr-2" />

    <span class="mr-2 text-lg font-normal">{{ userName }} </span>
    <button class="mr-2 text-[12px] font-normal hidden group-hover:block">
      دنبال کردن
    </button>
  </div>
</template>

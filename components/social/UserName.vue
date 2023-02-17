<script setup lang="ts">
const props = defineProps({
  pub: { type: String, required: true, default: "" },
});
const { $irisPublic } = useNuxtApp();
const userName = ref("نام کاربری");
onMounted(() => {
  if ($irisPublic) {
    $irisPublic(props.pub)
      .get("profile")
      .get("name")
      .on((name: string) => {
        userName.value = name;
      });
  }
});
</script>

<template>
  <span>{{ userName }} </span>
</template>

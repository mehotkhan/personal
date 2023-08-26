<script setup lang="ts">
const props = defineProps({
  pub: { type: String, required: true, default: "" },
});
const userName = ref("نام کاربری");
onMounted(() => {});
</script>

<template>
  <span>{{ userName }} </span>
</template>

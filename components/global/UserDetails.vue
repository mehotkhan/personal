<script setup lang="ts">
const { getUserDetails } = useUser();
const props = defineProps({
  pub: {
    type: String,
    required: true,
  },
});
const userDetails = await getUserDetails(props.pub);
</script>

<template>
  <span :key="props.pub">
    {{ userDetails?.displayName ?? "بدون نام" }}
  </span>
</template>

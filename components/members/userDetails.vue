<script setup lang="ts">
const { getUserDetails } = useUser();
const props = defineProps({
  userPub: {
    type: String,
    required: true,
  },
});
const userDetails = ref();

onMounted(async () => {
  userDetails.value = await getUserDetails(props.userPub);
});
</script>

<template>
  <span>
    {{ userDetails?.displayName ?? "بدون نام" }}
  </span>
</template>

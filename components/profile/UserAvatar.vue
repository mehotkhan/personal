<script setup lang="ts">
const { $dexieDb } = useNuxtApp();
const { getAvatar } = useMedia();

const props = defineProps({
  pub: { type: String, required: true, default: "" },
  size: { type: String, required: true, default: "xl" },
});
const userName = ref();
const userAvatar = ref();

onMounted(async () => {
  const avatarData = await getAvatar(props.pub);
  if (avatarData) {
    userAvatar.value = avatarData;
  } else {
    $dexieDb?.profiles.get(props.pub).then((profile: any) => {
      if (profile) {
        const json = JSON.parse(profile.content);
        userName.value = json?.displayName;
      }
    });
  }
});
</script>

<template>
  <UAvatar
    :key="props.pub"
    :size="props.size"
    class="text-md avatar"
    :alt="userName ?? 'کاربر مهمان'"
    :src="userAvatar"
  />
</template>
<style>
.avatar > span {
  letter-spacing: 5px !important;
}
</style>

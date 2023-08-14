<script setup lang="ts">
const { $dexieDb } = useNuxtApp();
const { profileStream, getUserDetails } = useUser();

const props = defineProps({
  pub: { type: String, required: true, default: "" },
  support: { type: Boolean, required: false, default: false },
});
const userName = ref();

onMounted(() => {
  profileStream(props.pub);
});

onMounted(async () => {
  const userData: any = await getUserDetails(props.pub);
  if (userData) {
    userName.value = userData.displayName;
  } else {
    await $dexieDb?.profiles.get({ pubkey: props.pub }).then((profile: any) => {
      if (profile) {
        const json = JSON.parse(profile.content);
        userName.value = json?.displayName;
      } else {
        userName.value = "کاربر مهمان";
      }
    });
  }
});
</script>

<template>
  <h5 :key="props.pub">
    <span v-if="props.support" class="">{{ userName }} </span>
    <nuxt-link v-else :to="`/social/u/${props.pub}`" class="hover:underline"
      >{{ userName }}
    </nuxt-link>
  </h5>
</template>

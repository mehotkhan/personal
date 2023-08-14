<script setup lang="ts">
const { $dexieDb } = useNuxtApp();

const props = defineProps({
  id: { type: String, required: true, default: "" },
  size: { type: String, required: true, default: "xl" },
});

const name = ref();
const picture = ref();

$dexieDb?.groups.get(props.id).then((group: any) => {
  if (group) {
    const json = JSON.parse(group.content);
    name.value = json?.title;
    picture.value = json?.picture;
  } else {
    name.value = "بدون نام";
    picture.value = null;
  }
});
</script>

<template>
  <UAvatar
    :key="props.id"
    :size="props.size"
    class="flex text-md avatar bg-contain"
    :alt="name ?? 'کاربر مهمان'"
    :src="picture"
  />
</template>
<style>
.avatar > span {
  letter-spacing: 5px !important;
}
</style>

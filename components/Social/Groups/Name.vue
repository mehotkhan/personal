<script setup lang="ts">
const { $dexieDb } = useNuxtApp();

const props = defineProps({
  id: { type: String, required: true, default: "" },
});
const name = ref();

$dexieDb?.groups.get(props.id).then((group: any) => {
  if (group) {
    const json = JSON.parse(group.content);
    name.value = json?.title;
  } else {
    name.value = "بدون نام";
  }
});
</script>

<template>
  <span :key="props.id">{{ name }} </span>
</template>

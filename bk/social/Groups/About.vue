<script setup lang="ts">
const { $dexieDb } = useNuxtApp();

const props = defineProps({
  id: { type: String, required: true, default: "" },
});
const about = ref();

$dexieDb?.groups.get(props.id).then((group: any) => {
  if (group) {
    const json = JSON.parse(group.content);
    about.value = json?.about;
  } else {
    about.value = "...";
  }
});
</script>

<template>
  <p :key="props.id">{{ about }}</p>
</template>

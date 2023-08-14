<script lang="ts" setup>
const { getMySpaces, mySpaces, changeSpace, currentSpace } = useStream();
const currentID = ref("global");

onMounted(() => {
  getMySpaces();
});

onUpdated(() => {
  currentID.value = currentSpace?.value?.spaceId;
});
</script>
<template>
  <ul :key="currentSpace?.spaceId" class="flex px-2">
    <li
      v-for="space in mySpaces"
      :key="space?.spaceId"
      class="flex items-center justify-start gap-5 ml-10"
      @click="changeSpace(space)"
    >
      <button
        :class="currentID === space?.spaceId ? 'text-orange' : 'text-black'"
      >
        {{ space?.title }}
      </button>
    </li>
  </ul>
</template>

<script setup>
const { streamTimeLimit, streamSorting } = useStream();
</script>
<template>
  <div class="relative w-full items-center flex justify-end">
    <USelectMenu
      v-model="streamTimeLimit"
      :options="timeFilter"
      size="xl"
      variant="none"
      :ui="{
        ring: 'ring-0',
        shadow: 'shadow-0',
      }"
      class="w-full w-15 cursor-pointer"
    >
      <template #label>
        <span class="text-md">
          {{ streamTimeLimit.label }}
        </span>
      </template>
    </USelectMenu>
    <USelectMenu
      v-model="streamSorting"
      size="xl"
      :options="streamOrder"
      class="w-full mr-2 w-25 cursor-pointer"
      variant="none"
      :ui="{
        ring: 'ring-0',
        shadow: 'shadow-0',
      }"
    >
      <template #label>
        <span class="text-md">
          {{ streamSorting.label }}
        </span>
      </template>
    </USelectMenu>
  </div>
</template>

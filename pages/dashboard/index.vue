<script setup>
useHead({
  title: "داشبورد",
});

definePageMeta({
  layout: "dashboard",
});
</script>
<template>
  <UCard
    class="w-full"
    :ui="{
      base: '',
      ring: '',
      shadow: '',
      divide: 'divide-y divide-gray-200 dark:divide-gray-700',
      header: { padding: 'px-0 py-5' },
      body: {
        padding: '',
        base: 'divide-y divide-gray-200 dark:divide-gray-700',
      },
      footer: { padding: 'p-4' },
    }"
  >
    <template #header>
      <div class="flex justify-between w-full items-center">
        <h2 class="text-xl">داشبورد</h2>
        <!-- <div>
          <UButtonGroup size="xl" class="border-gray-200 border px-1">
            <UButton
              variant="soft"
              label="انتشار"
              color="green"
              @click="save()"
            />
            <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
              <UButton
                class="px-3"
                variant="soft"
                :padded="false"
                :ui="{ rounded: 'rounded-0', ring: 'ring-0' }"
                icon="i-heroicons-chevron-down-20-solid"
                color="gray"
              />
            </UDropdown>
          </UButtonGroup>
        </div> -->
      </div>
    </template>

    <DashboardBasicCharts />
  </UCard>
</template>

<script lang="ts" setup>
const props = defineProps({
  service: {
    type: String,
    required: true,
    default: "notes",
  },
});
const { data }: any = useAsyncData("banner", () =>
  queryContent("notes")
    .where({ banner: true, service: props.service })
    .sort({ date: -1 })
    .findOne()
);
</script>
<template>
  <ContentRenderer :value="data" class="">
    <div
      class="flex flex-col-reverse md:flex-row justify-between items-center h-screen-md"
    >
      <div class="basis-2/2 md:basis-1/2 flex-col justify-start items-center">
        <div class="items-center flex gap-3">
          <h2 class="">
            <NuxtLink :to="data?._path" class="">
              {{ data?.title }}
            </NuxtLink>
          </h2>
        </div>

        <p>
          {{ data?.description }}
        </p>
        <ul class="flex flex-row mt-0 list-none items-center">
          <li key="category" class="text-lg">
            {{ data?.category }}
            <span class="font-bold text-sm">،</span>
          </li>
          <li v-for="tag in data?.tags" :key="tag" class="text-lg pl-0">
            {{ tag }}
            <span class="font-bold text-sm">،</span>
          </li>
          <li key="link" class="text-lg">
            <NuxtLink :to="data?._path" class="underline"> بیشتر </NuxtLink>
          </li>
        </ul>
      </div>
      <div class="basis-2/2 md:basis-1/2 flex justify-end items-center">
        <nuxt-img class="flex w-full max-w-[35rem]" :src="data?.thumbnail" />
      </div>
    </div>
  </ContentRenderer>
</template>

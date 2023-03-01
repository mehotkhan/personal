<script lang="ts" setup>
const { data }: any = await useAsyncData("banner", () =>
  queryContent("notes").where({ banner: true }).findOne()
);
</script>
<template>
  <ContentRenderer :value="data" class="">
    <div class="flex justify-between items-center h-screen-sm">
      <div class="basis-1/2 flex-col justify-start items-center">
        <h2 class="mx-2">
          {{ data?.title }}
        </h2>
        <p>
          {{ data?.description }}
        </p>
        <ul class="flex flex-row mt-0 list-none items-center">
          <li key="category" class="text-lg ml-0">
            {{ data?.category }}
            <span class="font-bold text-sm">،</span>
          </li>
          <li v-for="tag in data?.tags" :key="tag" class="-mr-7 text-lg pl-0">
            {{ tag }}
            <span class="font-bold text-sm">،</span>
          </li>
          <li key="link" class="text-lg -mr-7">
            <NuxtLink :to="data?._path" class="underline"> بیشتر </NuxtLink>
          </li>
        </ul>
      </div>
      <div class="basis-1/2 flex justify-end items-center">
        <img class="flex w-full max-w-100" :src="data?.thumbnail" />
      </div>
    </div>
  </ContentRenderer>
</template>

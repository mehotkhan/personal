<script lang="ts" setup>
const { data }: any = await useAsyncData("banner", () =>
  queryContent("notes").where({ banner: true }).findOne()
);
</script>
<template>
  <ContentRenderer :value="data" class="nuxt-content">
    <div class="flex justify-between items-center">
      <div class="basis-1/2">
        <h2>
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
      <div class="basis-1/2">
        <img class="w-full max-w-100 mx-auto" :src="data?.thumbnail" />
      </div>
    </div>
  </ContentRenderer>
</template>

<script lang="ts" setup>
const { data }: any = await useAsyncData("banner", () =>
  queryContent("notes").where({ banner: true }).findOne()
);
</script>
<template>
  <ContentRenderer :value="data" class="nuxt-content">
    <img class="poster-front" :src="data?.thumbnail" />
    <h2>
      <NuxtLink :to="data?._path">
        {{ data?.title }}
      </NuxtLink>
    </h2>
    <ul class="flex flex-row mt-0">
      <li key="category" class="text-lg text-gray-700 font-bold ml-0">
        {{ data?.category }}
      </li>
      <li
        v-for="tag in data?.tags"
        :key="tag"
        class="text-lg text-gray-700 pr-0"
      >
        <span class="-mr-6 font-bold text-sm"> / </span>
        {{ tag }}
      </li>
    </ul>
    <p>
      {{ data?.description }}
    </p>
  </ContentRenderer>
</template>

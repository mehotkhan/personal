<script lang="ts" setup>
const route = useRoute();

const { data }: any = await useAsyncData("page-data", () =>
  queryContent(
    route?.path.endsWith("/") ? route.path.slice(0, -1) : route?.path
  ).findOne()
);
</script>
<template>
  <ContentRenderer :value="data">
    <section class="flex flex-col justify-center pb-20">
      <h2 class="">{{ data?.title }}</h2>
      <hr />
      <div class="flex justify-between bg-gray-100 my-auto">
        <img :src="data?.thumbnail" class="w-150 flex" />
        <div class="px-10 w-full">
          <span v-if="data?.description" class="flex text-justify mt-10">
            {{ data?.description }}
          </span>
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
        </div>
      </div>
      <div
        class="flex relative"
        :class="data?.dir === 'ltr' ? '  flex-row-reverse' : 'flex-row'"
      >
        <div
          class="content basis-3/4 ml-10"
          :class="data?.dir === 'ltr' ? 'ltr ml-10' : 'rtl mr-10'"
        >
          <ContentRendererMarkdown :value="data" />
        </div>
        <div
          class="relative basis-1/4"
          :class="data?.dir === 'ltr' ? 'ml-10' : 'mr-10'"
        >
          <GlobalContentToc :post="data" class="left-0 sticky top-10" />
        </div>
      </div>
    </section>
    <Comments />
  </ContentRenderer>
</template>

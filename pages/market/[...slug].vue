<script lang="ts" setup>
const route = useRoute();

const { data }: any = await useAsyncData("page-data", () =>
  queryContent(
    route?.path.endsWith("/") ? route.path.slice(0, -1) : route?.path
  ).findOne()
);
</script>
<template>
  <section class="flex flex-col justify-center content-center">
    <ContentRenderer :value="data">
      <section class="flex flex-col justify-center">
        <div class="flex justify-between items-center h-screen-sm">
          <div class="basis-1/2 flex-col justify-start items-center">
            <h2 class="mx-2">
              {{ data?.title }}
            </h2>
            <p>
              {{ data?.description }}
            </p>
            <!-- <MarketProductRelatedNft /> -->
          </div>
          <div class="basis-1/2 flex justify-end items-center">
            <img class="flex w-full max-w-140" :src="data?.thumbnail" />
          </div>
        </div>
        <div
          class="flex relative justify-between"
          :class="data?.dir === 'ltr' ? '  flex-row-reverse' : 'flex-row'"
        >
          <div
            class="basis-3/4"
            :class="data?.dir === 'ltr' ? 'ltr mr-10' : 'rtl ml-10'"
          >
            <ContentRendererMarkdown :value="data" class="content" />
            <Comments />
          </div>
          <div
            class="relative basis-1/4"
            :class="data?.dir === 'ltr' ? 'ml-10' : 'mr-10'"
          >
            <GlobalContentToc :post="data" class="left-0 sticky top-30" />
          </div>
        </div>
      </section>
    </ContentRenderer>
  </section>
</template>

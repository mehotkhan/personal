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
        <div class="flex justify-between items-center min-h-140">
          <div class="basis-1/2">
            <h2>
              {{ data?.title }}
            </h2>
            <p>
              {{ data?.description }}
            </p>
            <MarketProductRelatedNft />
          </div>
          <div class="basis-1/2">
            <img class="w-full max-w-140 mx-auto" :src="data?.thumbnail" />
          </div>
        </div>
        <div
          class="flex relative"
          :class="data?.dir === 'ltr' ? '  flex-row-reverse' : 'flex-row'"
        >
          <div
            class="basis-3/4 ml-10"
            :class="data?.dir === 'ltr' ? 'ltr ml-10' : 'rtl mr-10'"
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

<script lang="ts" setup>
useHead({
  title: "فروشگاه",
});
const { data: bannerPost }: any = await useAsyncData("page-data", () =>
  queryContent("market").limit(1).find()
);
</script>
<template>
  <section class="flex flex-col justify-center content-center">
    <div class="content mb-10">
      <h2 class="text-4xl bold border-b-1 py-8">محصول برگزیده</h2>

      <div class="w-full mb-3 blur-sm">
        <ContentRenderer :value="bannerPost[0]" class="nuxt-content">
          <div class="flex flex-row mt-10">
            <div class="basis-3/5 px-1">
              <img class="block mt-0" :src="bannerPost[0]?.thumbnail" />
            </div>
            <div class="basis-4/5 mx-10">
              <h2 class="text-right text-3xl">
                <NuxtLink :to="`market/${bannerPost[0]?.url}`">
                  {{ bannerPost[0]?.title }}
                </NuxtLink>
              </h2>
              <p class="text-thin text-xl my-3">
                {{ bannerPost[0].description }}
              </p>
              <h4 class="text-xl my-3">یادداشت های مرتبط</h4>
              <ul class="text-lg list-disc mx-4">
                <li v-for="note in bannerPost[0]?.notes" :key="note">
                  <NuxtLink :to="note.url">
                    {{ note?.name }}
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </div>
        </ContentRenderer>
      </div>
    </div>
    <div class="content-area prose-md lg:prose-xl w-full font-normal">
      <ContentDoc path="/pages/market" />
    </div>

    <MarketIntroTabs />
  </section>
</template>

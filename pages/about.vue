<!-- <script setup>
useHead({
  title: "درباره من",
});
</script>
<template>
  <section class="flex flex-col justify-center content-center">
    <ContentDoc path="/pages/about" />
  </section>
</template>


 -->

<template>
  <section class="flex flex-col justify-center content-center mb-10">
    <ContentDoc path="/pages/about">
      <template #default="{ doc }">
        <section class="flex flex-col">
          <div class="flex justify-between items-center h-screen-sm">
            <div class="basis-1/2 flex-col justify-start items-center">
              <h2>
                {{ doc?.title }}
              </h2>
              <p>
                {{ doc?.description }}
              </p>
              <ul class="flex flex-row mt-0 list-none items-center gap-1">
                <li key="category" class="text-lg">
                  {{ doc?.category }}
                </li>
                <li v-for="tag in doc?.tags" :key="tag" class="text-lg pl-0">
                  <span class="font-bold text-sm">،</span>
                  {{ tag }}
                </li>
              </ul>
            </div>
            <div class="basis-1/2 flex justify-end items-center">
              <nuxt-img
                class="flex w-full max-w-[30rem] shadow-2xl rounded-md"
                :src="doc?.thumbnail"
              />
            </div>
          </div>
          <div
            class="flex relative justify-between"
            :class="doc?.dir === 'ltr' ? '  flex-row-reverse' : 'flex-row'"
          >
            <div
              class="basis-3/4"
              :class="doc?.dir === 'ltr' ? 'ltr mr-10' : 'rtl ml-10'"
            >
              <ContentRenderer :value="doc" class="content" />
            </div>
            <div
              class="relative basis-1/4"
              :class="doc?.dir === 'ltr' ? 'ml-10' : 'mr-10'"
            >
              <ContentToc :post="doc" class="left-0 sticky top-[7rem]" />
            </div>
          </div>
        </section>
      </template>
    </ContentDoc>
  </section>
</template>

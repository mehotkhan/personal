<script setup>
useHead({
  title: "درباره من",
});
</script>

<template>
  <section class="flex flex-col justify-center content-center mb-10">
    <ContentDoc path="/pages/about">
      <template #default="{ doc }">
        <section class="flex flex-col">
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

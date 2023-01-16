<script lang="ts" setup>
useHead({
  title: "صفحه نخست",
});
const notes = ref();
notes.value = await queryContent("notes").find();
const { data: bannerPost }: any = await useAsyncData("page-data", () =>
  queryContent("banner/intro").findOne()
);
</script>
<template>
  <section class="intro flex flex-col justify-center content-center">
    <div class="content">
      <div class="w-full mb-3 blur-sm">
        <ContentRenderer :value="bannerPost" class="nuxt-content">
          <img class="poster" :src="bannerPost?.thumbnail" />
          <ContentRendererMarkdown :value="bannerPost" />
        </ContentRenderer>
      </div>

      <div class="latest my-10">
        <h3>جدیدترین ورودی‌ها</h3>
        <hr />
        <ul>
          <li
            v-for="{ _path: slug, title, date, category } in orderByDate(notes)"
            :key="slug"
            class="mb-2"
          >
            <NuxtLink :to="slug">
              {{ title }}
              <span class="font-thin"> / {{ category }} </span>
              <span class="font-thin"> / {{ JalaliDate(date) }} </span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
<style lang="scss">
.intro {
  h2 {
    text-align: center;
  }
}
</style>

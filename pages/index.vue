<script lang="ts" setup>
useHead({
  title: "صفحه نخست",
});
const notes = await queryContent("notes");
const { data: bannerPost }: any = await useAsyncData("page-data", () =>
  notes.where({ banner: true }).limit(1).find()
);

const latestNotes = await notes.find();
</script>
<template>
  <section class="intro flex flex-col">
    <div class="content content-area prose-md lg:prose-2xl w-full font-normal">
      <div class="w-full mb-3 blur-sm">
        <ContentRenderer :value="bannerPost[0]" class="nuxt-content">
          <img class="poster-front" :src="bannerPost[0]?.thumbnail" />
          <h2>
            <NuxtLink :to="bannerPost[0]._path">
              {{ bannerPost[0].title }}
            </NuxtLink>
          </h2>
          <ul class="flex flex-row mt-0">
            <li key="category" class="text-lg text-gray-700 font-bold ml-0">
              {{ bannerPost[0].category }}
            </li>
            <li
              v-for="tag in bannerPost[0].tags"
              :key="tag"
              class="text-lg text-gray-700 pr-0"
            >
              <span class="-mr-6 font-bold text-sm"> / </span>
              {{ tag }}
            </li>
          </ul>
          <p>
            {{ bannerPost[0].description }}
          </p>
        </ContentRenderer>
      </div>

      <div class="latest my-10">
        <h3>جدیدترین ورودی‌ها</h3>
        <hr />
        <ul>
          <li
            v-for="{ _path: slug, title, date, category } in orderByDate(
              latestNotes
            )"
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

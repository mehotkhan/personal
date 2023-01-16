<script setup>
useHead({
  title: "دوره های آموزشی",
});
const tuts = ref();
tuts.value = await queryContent("tuts").find();
</script>
<template>
  <section class="flex flex-col justify-center content-center">
    <div class="content">
      <h2 class="text-4xl bold border-b-1 pb-1">جدید ترین دوره ها</h2>
      <div class="latest my-10">
        <ul class="list-decimal text-xl mt-10">
          <li
            v-for="{ _path: slug, title, date } in orderByDate(tuts)"
            :key="slug"
            class="mb-2"
          >
            <NuxtLink :to="slug">
              {{ title }}
              <span class="font-thin"> / {{ JalaliDate(date) }} </span>
            </NuxtLink>
          </li>

          <!-- ... -->
        </ul>
      </div>
      <div class="w-full mb-3 blur-sm">
        <ContentDoc path="/index-tuts" />
        <Comments />
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>

<script setup>
useHead({
  title: "یادداشت‌ها",
});
const notes = ref();
notes.value = await queryContent("notes").find();
</script>
<template>
  <section class="flex flex-col justify-center content-center">
    <div class="content content-area prose-md lg:prose-2xl w-full font-normal">
      <div class="w-full mb-3 blur-sm">
        <ContentDoc path="/pages/notes" />
      </div>
      <h2 class="text-4xl bold border-b-1 pb-1">جدیدترین یادداشت ها</h2>

      <div class="latest my-10">
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

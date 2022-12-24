<script setup>
useHead({
  title: "یادداشت‌ها",
});
const notes = ref()
notes.value = await queryContent('notes').find()

</script>
<template>
  <section class="flex flex-col justify-center content-center">
    <div class="content">
      <div class="w-full mb-3 blur-sm">
        <ContentDoc class="text-2xl" path="/index-notes" />

      </div>
      <div class="latest my-10">

        <ol class="list-decimal text-xl mt-10">
          <li v-for="{
            _path: slug,
            title,
            date,
          } in notes" :key="slug" class="mb-2">
            <NuxtLink :to="slug">
              {{ title }}
              <span class="font-thin"> / {{ date }} </span>
            </NuxtLink>
          </li>
        </ol>
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

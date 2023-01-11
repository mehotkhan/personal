<script setup>
useHead({
  title: "علی زِمانی://طراح و توسعه دهنده وب",
});
const books = ref();
const notes = ref();
notes.value = await queryContent("notes").find();
books.value = await queryContent("books").find();
</script>
<template>
  <section class="flex flex-col justify-center content-center">
    <div class="content">
      <div class="w-full mb-3 blur-sm">
        <ContentDoc path="/intro" />
      </div>

      <div class="latest my-10">
        <li
          v-for="{ _path: slug, title, date, category } in [...books, ...notes]"
          :key="slug"
          class="mb-2"
        >
          <NuxtLink :to="slug">
            {{ title }}
            <span class="font-thin"> / {{ category }} </span>
            <span class="font-thin"> / {{ date }} </span>
          </NuxtLink>
        </li>
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
<style lang="scss">
.latest {
  ol {
    list-style-type: persian;
  }
}

img {
  max-width: 300px;
  margin: 0 auto;
  margin-bottom: 30px;
  display: block;
  width: 90%;
}
</style>

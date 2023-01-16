<script setup>
import moment from "moment-jalaali";
import * as _ from "lodash";

useHead({
  title: "علی زِمانی://طراح و توسعه دهنده وب",
});
const books = ref();
const notes = ref();
const tuts = ref();
notes.value = await queryContent("notes").find();
books.value = await queryContent("books").find();
tuts.value = await queryContent("tuts").find();
</script>
<template>
  <section class="intro flex flex-col justify-center content-center">
    <div class="content">
      <div class="w-full mb-3 blur-sm">
        <ContentDoc path="/intro" />
      </div>

      <div class="latest my-10">
        <li
          v-for="{ _path: slug, title, date, category } in orderByDate([
            ...books,
            ...notes,
            ...tuts,
          ])"
          :key="slug"
          class="mb-2"
        >
          <NuxtLink :to="slug">
            {{ title }}
            <span class="font-thin"> / {{ category }} </span>
            <span class="font-thin"> / {{ JalaliDate(date) }} </span>
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

.intro {
  img {
    max-width: 300px !important;
    margin: -30px auto !important;
    margin-bottom: 30px !important;
    display: block !important;
    width: 90% !important;
  }
  h2 {
    text-align: center;
  }
}
</style>

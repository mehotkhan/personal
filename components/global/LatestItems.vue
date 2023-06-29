<script lang="ts" setup>
import type { QueryBuilderParams } from "@nuxt/content/dist/runtime/types";
const query: QueryBuilderParams = {
  path: "/notes",
  limit: 10,
  sort: [{ order: 1 }],
};
</script>
<template>
  <ContentList v-slot="{ list }" :query="query" class="nuxt-content">
    <div class="latest -mt-4">
      <h3>جدیدترین ورودی‌ها</h3>
      <hr />
      <ul>
        <li
          v-for="{ _path: slug, title, date, category } in list"
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
  </ContentList>
</template>

<script lang="ts" setup>
const { data }: any = await useAsyncData("market", () =>
  queryContent("market").where({ _draft: false }).limit(10).find()
);
</script>
<template>
  <ContentRenderer :value="data" class="nuxt-content">
    <div class="latest -mt-4">
      <h3>جدیدترین محصولات</h3>
      <hr />
      <ul>
        <li
          v-for="{ _path: slug, title, date, category } in orderByDate(data)"
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
  </ContentRenderer>
</template>

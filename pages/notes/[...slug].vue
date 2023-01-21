<script lang="ts" setup>
import { useContent } from "~/stores/content";
import { Ref } from "vue";
const route = useRoute();

definePageMeta({
  layout: "content",
});

const nuxtContent = ref(null);
const observer: Ref<IntersectionObserver | null | undefined> = ref(null);
const observerOptions = reactive({
  root: nuxtContent.value,
  threshold: 0.5,
});
const content = useContent();
const { data }: any = await useAsyncData("page-data", () =>
  queryContent(route.path).findOne()
);

onMounted(() => {
  observer.value = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute("id");
      if (entry.isIntersecting) {
        content.setSection(id);
      }
    });
  }, observerOptions);
  document
    .querySelectorAll(".nuxt-content h2[id], .nuxt-content h3[id]")
    .forEach((section) => {
      observer.value?.observe(section);
    });
});

onUnmounted(() => {
  observer.value?.disconnect();
});
</script>
<template>
  <ContentRenderer :value="data" class="nuxt-content">
    <section
      class="flex flex-col justify-center content-center"
      :class="data?.dir === 'ltr' ? 'ltr' : 'rtl'"
    >
      <h1 class="pt-20 text-center">{{ data?.title }}</h1>
      <img class="poster-single" :src="data?.thumbnail" />
      <p
        class="bg-gray-200 my-auto text-justify p-10 border-r-gray-300 border-5"
      >
        {{ data?.description }}
      </p>

      <ContentRendererMarkdown :value="data" />
      <!-- <Comments /> -->
    </section>
  </ContentRenderer>
</template>

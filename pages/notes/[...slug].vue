<script lang="ts" setup>
import { useContent } from "~/stores/content";
import { Ref } from "vue";
const route = useRoute();

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

useHead({
  title: "علی زِمانی://طراح و توسعه دهنده وب",
});
</script>
<template>
  <section class="flex flex-col justify-center content-center">
    <ContentRenderer :value="data" class="nuxt-content">
      <h1>{{ data?.title }}</h1>
      <img :src="data?.thumbnail" />
      <ContentRendererMarkdown :value="data" />
    </ContentRenderer>
    <Comments />
  </section>
</template>
